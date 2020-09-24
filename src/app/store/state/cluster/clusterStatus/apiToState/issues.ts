import { api } from "app/backend";
import * as types from "app/store/state/types";

type ApiIssue = api.types.clusterStatus.ApiIssue;
type ApiWithIssues = api.types.clusterStatus.ApiWithIssues;

const mapIssue = (severity: types.cluster.Issue["severity"]) => (
  issue: ApiIssue,
) => ({
  severity,
  message: issue.message,
});

export const transformIssues = (
  element: ApiWithIssues,
): types.cluster.Issue[] => [
  ...element.error_list.map(mapIssue("ERROR")),
  ...element.warning_list.map(mapIssue("WARNING")),
];
