import React from "react";

import { types } from "app/store";
import { IssueListIssueDefault } from "app/view";

export const ClusterDetailIssue: React.FC<{
  issue: types.cluster.Issue;
}> = ({ issue }) => {
  return <IssueListIssueDefault issue={issue} />;
};
