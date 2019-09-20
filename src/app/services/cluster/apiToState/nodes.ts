import { ApiNode } from "app/common/backend/clusterStatusTypes";
import { statusSeverity } from "app/common/utils";
import { StatusSeverity } from "app/common/types";

import { Node } from "../types";
import { transformIssues } from "./issues";

const mapStatus = (status: ApiNode["status"]): Node["status"] => {
  switch (status) {
    case "online": return "ONLINE";
    case "offline": return "OFFLINE";
    default: return "UNKNOWN";
  }
};

const statusToSeverity = (
  status: ApiNode["status"],
): Node["statusSeverity"] => {
  switch (status) {
    case "online": return "OK";
    case "offline": return "ERROR";
    default: return "UNKNOWN";
  }
};

const mapQuorum = (quorum: ApiNode["quorum"]): Node["quorum"] => {
  switch (quorum) {
    case true: return "YES";
    case false: return "NO";
    default: return "UNKNOWN";
  }
};

const quorumToSeverity = (
  quorum: ApiNode["quorum"],
): Node["quorumSeverity"] => {
  switch (quorum) {
    case true: return "OK";
    case false: return "WARNING";
    default: return "UNKNOWN";
  }
};

const toMaxSeverity = (lastMaxSeverity: StatusSeverity, apiNode: ApiNode) => {
  if (apiNode.status === "offline") {
    return "ERROR";
  }
  if (apiNode.quorum === false) {
    return statusSeverity.max(lastMaxSeverity, "WARNING");
  }
  if (apiNode.status === "online" && apiNode.quorum === true) {
    return statusSeverity.max(lastMaxSeverity, "OK");
  }
  return statusSeverity.max(lastMaxSeverity, "UNKNOWN");
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
  nodesSeverity: apiNodeList.reduce<StatusSeverity>(toMaxSeverity, "OK"),
});
