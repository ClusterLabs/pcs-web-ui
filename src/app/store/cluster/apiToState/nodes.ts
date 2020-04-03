import { ApiNode } from "app/backend/types/clusterStatus";
import * as statusSeverity from "./statusSeverity";

import { NodeQuorumFlag, NodeStatusFlag, StatusSeverity } from "../types";
import { transformIssues } from "./issues";

export const mapStatus = (status: ApiNode["status"]): NodeStatusFlag => {
  switch (status) {
    case "online":
      return "ONLINE";
    case "offline":
      return "OFFLINE";
    default:
      return "UNKNOWN";
  }
};

export const statusToSeverity = (status: ApiNode["status"]): StatusSeverity => {
  switch (status) {
    case "online":
      return "OK";
    case "offline":
      return "ERROR";
    default:
      return "UNKNOWN";
  }
};

export const mapQuorum = (quorum: ApiNode["quorum"]): NodeQuorumFlag => {
  switch (quorum) {
    case true:
      return "YES";
    case false:
      return "NO";
    default:
      return "UNKNOWN";
  }
};

export const quorumToSeverity = (quorum: ApiNode["quorum"]): StatusSeverity => {
  switch (quorum) {
    case true:
      return "OK";
    case false:
      return "WARNING";
    default:
      return "UNKNOWN";
  }
};

export const toSeverity = (
  status: ApiNode["status"],
  quorum: ApiNode["quorum"],
) => {
  if (status === "offline") {
    return "ERROR";
  }
  if (quorum === false) {
    return "WARNING";
  }
  if (status === "online" && quorum === true) {
    return "OK";
  }
  return "UNKNOWN";
};

const toNode = (apiNode: ApiNode) => ({
  name: apiNode.name,
  status: mapStatus(apiNode.status),
  statusSeverity: statusToSeverity(apiNode.status),
  quorum: mapQuorum(apiNode.quorum),
  quorumSeverity: quorumToSeverity(apiNode.quorum),
  issueList: transformIssues(apiNode),
});

export const processApiNodes = (apiNodeList: ApiNode[]) => ({
  nodeList: apiNodeList.map(toNode),
  nodesSeverity: apiNodeList.reduce<StatusSeverity>(
    (lastMaxSeverity, node) =>
      statusSeverity.max(lastMaxSeverity, toSeverity(node.status, node.quorum)),
    "OK",
  ),
});
