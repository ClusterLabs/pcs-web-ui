import {Alert} from "@patternfly/react-core";

import {Issue} from "app/view/cluster/types";

export const IssueListIssueDefault = ({issue}: {issue: Issue}) => {
  return (
    <Alert
      isInline
      variant={issue.severity === "ERROR" ? "danger" : "warning"}
      title={issue.message}
      data-test={`cluster-issue ${issue.severity} ${issue.message}`}
    />
  );
};
