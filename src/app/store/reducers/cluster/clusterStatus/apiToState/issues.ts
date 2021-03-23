import { ClusterStatus, Issue, apiTypes } from "../types";

// It is more practical to deduce issue from one place (so resource and node are
// skipped).
// 1. The types are the same - typescript infere the type correctly.
// 2. Don't want a formal duty to keep it in sync a new occurences here.
type ApiIssue = (apiTypes.Cluster["error_list"] &
  apiTypes.Cluster["warning_list"])[number];

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

export const transformIssues = (element: {
  error_list: ApiIssue[];
  warning_list: ApiIssue[];
}): Issue[] => [
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
