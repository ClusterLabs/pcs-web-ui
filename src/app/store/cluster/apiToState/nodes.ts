import {
  ApiClusterStatus,
  ApiNode,
  ApiNodeQuorum,
  ApiNodeStatus,
} from "app/backend/types/clusterStatus";
import * as statusSeverity from "./statusSeverity";

import { Node, NodeQuorumFlag, NodeStatusFlag, StatusSeverity } from "../types";
import { transformIssues } from "./issues";

const mapStatus = (status: ApiNodeStatus): NodeStatusFlag => {
  if (status === "standby") {
    return "STANDBY";
  }
  if (status === "offline") {
    return "OFFLINE";
  }
  return "ONLINE";
};

const statusToSeverity = (status: ApiNodeStatus): StatusSeverity => {
  if (status === "offline") {
    return "ERROR";
  }
  if (status === "standby") {
    return "WARNING";
  }
  return "OK";
};

const mapQuorum = (quorum: ApiNodeQuorum): NodeQuorumFlag =>
  (quorum ? "YES" : "NO");

const quorumToSeverity = (quorum: ApiNodeQuorum): StatusSeverity =>
  (quorum ? "OK" : "WARNING");

const toSeverity = (status: ApiNodeStatus, quorum: ApiNodeQuorum) => {
  if (status === "offline") {
    return "ERROR";
  }
  if (status === "online" && quorum === true) {
    return "OK";
  }
  return "WARNING";
};

const isCibTrue = (value: string): boolean =>
  ["true", "on", "yes", "y", "1"].includes(value.toLowerCase());

const toNode = (apiNode: ApiNode, apiClusterStatus: ApiClusterStatus): Node =>
  (apiNode.status === "unknown"
    ? {
      name: apiNode.name,
      status: "DATA_NOT_PROVIDED",
      issueList: transformIssues(apiNode),
    }
    : {
      name: apiNode.name,
      status: mapStatus(apiNode.status),
      statusSeverity: statusToSeverity(apiNode.status),
      quorum: mapQuorum(apiNode.quorum),
      quorumSeverity: quorumToSeverity(apiNode.quorum),
      issueList: transformIssues(apiNode),
      services: apiNode.services,
      clusterServices: {
        pacemaker: {
          standby:
              apiClusterStatus.pacemaker_standby?.includes(apiNode.name)
              ?? false,
          maintenance: isCibTrue(
              apiClusterStatus.node_attr?.[apiNode.name]?.find(
                attr => attr.name === "maintenance",
              )?.value ?? "",
          ),
        },
      },
    });

const countNodesSeverity = (apiNodeList: ApiNode[]): StatusSeverity => {
  if (apiNodeList.every(node => node.status === "unknown")) {
    return "ERROR";
  }

  return apiNodeList.reduce<StatusSeverity>(
    (lastMaxSeverity, node) =>
      statusSeverity.max(
        lastMaxSeverity,
        node.status === "unknown" ? "OK" : toSeverity(node.status, node.quorum),
      ),
    "OK",
  );
};

export const processApiNodes = (
  apiNodeList: ApiNode[],
  apiClusterStatus: ApiClusterStatus,
): {
  nodeList: Node[];
  nodesSeverity: StatusSeverity;
} => ({
  nodeList: apiNodeList.map(node => toNode(node, apiClusterStatus)),
  nodesSeverity: countNodesSeverity(apiNodeList),
});
