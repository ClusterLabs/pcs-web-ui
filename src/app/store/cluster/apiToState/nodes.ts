import { ApiNode, ApiNodeQuorum } from "app/backend/types/clusterStatus";
import * as statusSeverity from "./statusSeverity";

import { NodeQuorumFlag, NodeStatusFlag, StatusSeverity } from "../types";
import { transformIssues } from "./issues";

const mapStatus = (status: ApiNode["status"]): NodeStatusFlag => {
  switch (status) {
    case "online":
      return "ONLINE";
    case "offline":
      return "OFFLINE";
    default:
      return "UNKNOWN";
  }
};

const statusToSeverity = (status: ApiNode["status"]): StatusSeverity => {
  switch (status) {
    case "online":
      return "OK";
    case "offline":
      return "ERROR";
    default:
      return "UNKNOWN";
  }
};

const mapQuorum = (quorum: ApiNodeQuorum): NodeQuorumFlag => {
  switch (quorum) {
    case true:
      return "YES";
    case false:
      return "NO";
    default:
      return "UNKNOWN";
  }
};

const quorumToSeverity = (quorum: ApiNodeQuorum): StatusSeverity => {
  switch (quorum) {
    case true:
      return "OK";
    case false:
      return "WARNING";
    default:
      return "UNKNOWN";
  }
};

const toSeverity = (status: ApiNode["status"], quorum: ApiNodeQuorum) => {
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
  quorum: apiNode.status !== "unknown" ? mapQuorum(apiNode.quorum) : "UNKNOWN",
  quorumSeverity:
    apiNode.status !== "unknown" ? quorumToSeverity(apiNode.quorum) : "UNKNOWN",
  issueList: transformIssues(apiNode),
});

export const processApiNodes = (apiNodeList: ApiNode[]) => ({
  nodeList: apiNodeList.map(toNode),
  nodesSeverity: apiNodeList.reduce<StatusSeverity>(
    (lastMaxSeverity, node) =>
      statusSeverity.max(
        lastMaxSeverity,
        node.status !== "unknown"
          ? toSeverity(node.status, node.quorum)
          : "UNKNOWN",
      ),
    "OK",
  ),
});
