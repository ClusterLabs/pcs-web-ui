import React from "react";
import { Alert } from "@patternfly/react-core";

import { Issue } from "app/view/cluster/types";

export const IssueListIssueDefault: React.FC<{
  issue: Issue;
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
