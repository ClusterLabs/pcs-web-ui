import React from "react";
import { Alert } from "@patternfly/react-core";

import { types } from "app/store";

export const IssueListIssueDefault: React.FC<{
  issue: types.cluster.Issue;
}> = ({ issue }) => {
  return (
    <Alert
      isInline
      variant={issue.severity === "ERROR" ? "danger" : "warning"}
      title={issue.message}
      data-test={`cluster-issue ${issue.severity} ${issue.message}`}
    />
  );
};
