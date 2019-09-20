import {
  ApiIssue,
  ApiWithIssues,
} from "app/common/backend/clusterStatusTypes";

import { Issue } from "../types";

const mapIssue = (severity: Issue["severity"]) => (issue: ApiIssue) => ({
  severity,
  message: issue.message,
});

export const transformIssues = (element: ApiWithIssues) => [
  ...element.error_list.map(mapIssue("ERROR")),
  ...element.warning_list.map(mapIssue("WARNING")),
];
