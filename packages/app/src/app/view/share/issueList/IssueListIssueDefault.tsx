import {Alert} from "@patternfly/react-core";

import {Issue} from "app/view/cluster/types";

export const IssueListIssueDefault = (props: {
  issue: Issue;
  "data-test"?: string;
}) => {
  return (
    <Alert
      isInline
      variant={props.issue.severity === "ERROR" ? "danger" : "warning"}
      title={props.issue.message}
      data-test={props["data-test"]}
    />
  );
};
