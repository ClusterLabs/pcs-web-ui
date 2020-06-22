import { ApiIssue, ApiWithIssues } from "app/backend/types/clusterStatus";

import { types } from "app/store";

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
