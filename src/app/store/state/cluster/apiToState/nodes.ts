import {
  ApiClusterStatus,
  ApiNode,
  ApiNodeQuorum,
  ApiNodeStatus,
} from "app/backend/types/clusterStatus";
import { types } from "app/store";
import * as statusSeverity from "./statusSeverity";

import { transformIssues } from "./issues";

const mapStatus = (status: ApiNodeStatus): types.cluster.NodeStatusFlag => {
  if (status === "standby") {
    return "STANDBY";
  }
  if (status === "offline") {
    return "OFFLINE";
  }
  return "ONLINE";
};

const statusToSeverity = (
  status: ApiNodeStatus,
): types.cluster.StatusSeverity => {
  if (status === "offline") {
    return "ERROR";
  }
  if (status === "standby") {
    return "WARNING";
  }
  return "OK";
};

const quorumToSeverity = (
  quorum: ApiNodeQuorum,
): types.cluster.StatusSeverity => (quorum ? "OK" : "WARNING");

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

const toNode = (
  apiNode: ApiNode,
  apiClusterStatus: ApiClusterStatus,
): types.cluster.Node =>
  (apiNode.status === "unknown"
    ? {
      name: apiNode.name,
      status: "DATA_NOT_PROVIDED",
      issueList: transformIssues(apiNode),
      utilization: apiClusterStatus.nodes_utilization?.[apiNode.name] ?? [],
      attributes: apiClusterStatus.node_attr?.[apiNode.name] ?? [],
    }
    : {
      name: apiNode.name,
      status: mapStatus(apiNode.status),
      statusSeverity: statusToSeverity(apiNode.status),
      quorum: !!apiNode.quorum,
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
      utilization: apiClusterStatus.nodes_utilization?.[apiNode.name] ?? [],
      attributes: apiClusterStatus.node_attr?.[apiNode.name] ?? [],
    });

const countNodesSeverity = (
  apiNodeList: ApiNode[],
): types.cluster.StatusSeverity => {
  if (apiNodeList.every(node => node.status === "unknown")) {
    return "ERROR";
  }

  return apiNodeList.reduce<types.cluster.StatusSeverity>(
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
  nodeList: types.cluster.Node[];
  nodesSeverity: types.cluster.StatusSeverity;
} => ({
  nodeList: apiNodeList.map(node => toNode(node, apiClusterStatus)),
  nodesSeverity: countNodesSeverity(apiNodeList),
});
