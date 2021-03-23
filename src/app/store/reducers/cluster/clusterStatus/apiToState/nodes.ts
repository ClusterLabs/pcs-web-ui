import { Node, NodeStatusFlag, StatusSeverity, apiTypes } from "../types";

import * as statusSeverity from "./statusSeverity";
import { transformIssues } from "./issues";

type ApiNode = apiTypes.Cluster["node_list"][number];
type ApiNodeQuorum = Extract<ApiNode, { quorum: unknown }>["quorum"];
type ApiNodeStatus = Extract<ApiNode, { status: unknown }>["status"];
type ApiNodeAttrListMap = NonNullable<apiTypes.Cluster["node_attr"]>;
type ApiNodeAttrList = ApiNodeAttrListMap[keyof ApiNodeAttrListMap];

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

const quorumToSeverity = (quorum: ApiNodeQuorum): StatusSeverity =>
  quorum ? "OK" : "WARNING";

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

const isNodeAttrCibTrue = (nodeAttrsList: ApiNodeAttrList, attrName: string) =>
  isCibTrue(nodeAttrsList.find(a => a.name === attrName)?.value ?? "");

// apiNode are data gained from node
// nodeAttrsList are data provided by cluster itself
const toNode = (apiNode: ApiNode, nodeAttrsList: ApiNodeAttrList): Node => {
  const clusterInfo = {
    inMaintenance: isNodeAttrCibTrue(nodeAttrsList, "maintenance"),
    inStandby: isNodeAttrCibTrue(nodeAttrsList, "standby"),
  };

  return apiNode.status === "unknown"
    ? {
        ...clusterInfo,
        name: apiNode.name,
        status: "DATA_NOT_PROVIDED",
        issueList: transformIssues(apiNode),
      }
    : {
        ...clusterInfo,
        name: apiNode.name,
        status: mapStatus(apiNode.status),
        statusSeverity: statusToSeverity(apiNode.status),
        quorum: !!apiNode.quorum,
        quorumSeverity: quorumToSeverity(apiNode.quorum),
        issueList: transformIssues(apiNode),
        services: apiNode.services,
      };
};

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
  apiNodeAttrs: ApiNodeAttrListMap,
): {
  nodeList: Node[];
  nodesSeverity: StatusSeverity;
} => ({
  nodeList: apiNodeList.map(apiNode =>
    toNode(apiNode, apiNodeAttrs[apiNode.name]),
  ),
  nodesSeverity: countNodesSeverity(apiNodeList),
});
