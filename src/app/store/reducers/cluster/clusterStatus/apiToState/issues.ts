import { api } from "app/backend";

import { Issue } from "../types";

type ApiIssue = api.types.clusterStatus.ApiIssue;
type ApiWithIssues = api.types.clusterStatus.ApiWithIssues;

const mapIssue = (severity: Issue["severity"]) => (issue: ApiIssue): Issue => {
  if (
    "type" in issue
    && "node_list" in issue
    && issue.type === "nodes_not_authorized"
  ) {
    return {
      severity,
      type: issue.type,
      message: issue.message,
      nodeList: issue.node_list,
    };
  }
  return {
    severity,
    message: issue.message,
  };
};

export const transformIssues = (element: ApiWithIssues): Issue[] => [
  ...element.error_list.map(mapIssue("ERROR")),
  ...element.warning_list.map(mapIssue("WARNING")),
];
