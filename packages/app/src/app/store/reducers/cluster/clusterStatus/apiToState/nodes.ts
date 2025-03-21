import type {ActionPayload} from "app/store/actions";
import {isCibTrue} from "app/store/tools";

import type {Cluster, StatusSeverity} from "../types";

import * as statusSeverity from "./statusSeverity";
import {transformIssues} from "./issues";
import {apiToNodeSbd} from "./nodeSbd";

type ApiCluster = ActionPayload["CLUSTER.STATUS.FETCH.OK"];
type ApiNode = ApiCluster["node_list"][number];
type ApiNodeQuorum = Extract<ApiNode, {quorum: unknown}>["quorum"];
type ApiNodeStatus = Extract<ApiNode, {status: unknown}>["status"];
type ApiNodeAttrListMap = NonNullable<ApiCluster["node_attr"]>;
type ApiNodeAttrList = ApiNodeAttrListMap[keyof ApiNodeAttrListMap];

type Node = Cluster["nodeList"][number];

const mapStatus = (
  status: ApiNodeStatus,
): Exclude<Node, {status: "DATA_NOT_PROVIDED"}>["status"] => {
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
        sbd: apiToNodeSbd(apiNode),
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

const getClusterStatus = (apiNodeList: ApiNode[]): Cluster["status"] => {
  if (
    apiNodeList.every(n => n.status === "online") &&
    apiNodeList.some(n => "quorum" in n && n.quorum)
  ) {
    return "running";
  }
  if (apiNodeList.some(n => n.status === "online" && n.quorum)) {
    return "degraded";
  }
  if (apiNodeList.some(n => n.status === "online" || n.status === "standby")) {
    return "inoperative";
  }
  if (apiNodeList.some(n => n.status === "unknown")) {
    return "unknown";
  }
  return "offline";
};
const hasCibInfo = (apiNodeList: ApiNode[]): Cluster["hasCibInfo"] =>
  apiNodeList.some(n => n.status === "online" || n.status === "standby");

export const processApiNodes = (
  apiNodeList: ApiNode[],
  apiNodeAttrs: ApiNodeAttrListMap,
): {
  nodeList: Node[];
  nodesSeverity: StatusSeverity;
  clusterStatus: Cluster["status"];
  hasCibInfo: Cluster["hasCibInfo"];
} => ({
  nodeList: apiNodeList.map(apiNode =>
    toNode(apiNode, apiNodeAttrs[apiNode.name] || []),
  ),
  nodesSeverity: countNodesSeverity(apiNodeList),
  clusterStatus: getClusterStatus(apiNodeList),
  hasCibInfo: hasCibInfo(apiNodeList),
});
