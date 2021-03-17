import { api } from "app/backend";
import { types } from "app/store/reducers";

import * as statusSeverity from "./statusSeverity";
import { transformIssues } from "./issues";

type ApiNode = api.types.clusterStatus.ApiNode;
type ApiNodeQuorum = api.types.clusterStatus.ApiNodeQuorum;
type ApiNodeStatus = api.types.clusterStatus.ApiNodeStatus;

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

const toNode = (apiNode: ApiNode): types.cluster.Node =>
  apiNode.status === "unknown"
    ? {
        name: apiNode.name,
        status: "DATA_NOT_PROVIDED",
        issueList: transformIssues(apiNode),
      }
    : {
        name: apiNode.name,
        status: mapStatus(apiNode.status),
        statusSeverity: statusToSeverity(apiNode.status),
        quorum: !!apiNode.quorum,
        quorumSeverity: quorumToSeverity(apiNode.quorum),
        issueList: transformIssues(apiNode),
        services: apiNode.services,
      };

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
): {
  nodeList: types.cluster.Node[];
  nodesSeverity: types.cluster.StatusSeverity;
} => ({
  nodeList: apiNodeList.map(toNode),
  nodesSeverity: countNodesSeverity(apiNodeList),
});
