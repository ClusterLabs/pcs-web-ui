import { api } from "app/backend";
import { types } from "app/store/reducers";

type ApiIssue = api.types.clusterStatus.ApiIssue;
type ApiWithIssues = api.types.clusterStatus.ApiWithIssues;

const mapIssue = (severity: types.cluster.Issue["severity"]) => (
  issue: ApiIssue,
): types.cluster.Issue => {
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

export const transformIssues = (
  element: ApiWithIssues,
): types.cluster.Issue[] => [
  ...element.error_list.map(mapIssue("ERROR")),
  ...element.warning_list.map(mapIssue("WARNING")),
];
