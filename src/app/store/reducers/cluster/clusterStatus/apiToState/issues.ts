import { api } from "app/backend";

import { ClusterStatus, Issue } from "../types";

type ApiElementWithIssues =
  | api.clusterStatus.ClusterStatus
  | api.clusterStatus.Node
  | api.clusterStatus.Resource;

type ApiIssue = (ApiElementWithIssues["error_list"] &
  ApiElementWithIssues["warning_list"])[number];

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

export const transformIssues = (element: ApiElementWithIssues): Issue[] => [
  ...element.error_list.map(mapIssue("ERROR")),
  ...element.warning_list.map(mapIssue("WARNING")),
];

export const issuesToSummarySeverity = (
  errorList: ApiIssue[],
  warningList: ApiIssue[],
): ClusterStatus["summary"]["issuesSeverity"] => {
  if (errorList.length > 0) {
    return "ERROR";
  }
  if (warningList.length > 0) {
    return "WARNING";
  }
  return "OK";
};
