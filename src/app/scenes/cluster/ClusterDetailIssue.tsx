import React from "react";
import { Alert, AlertActionLink } from "@patternfly/react-core";

import { types } from "app/store";
import { IssueListIssueDefault } from "app/view";

export const ClusterDetailIssue: React.FC<{
  issue: types.cluster.Issue;
}> = ({ issue }) => {
  if ("type" in issue && issue.type === "nodes_not_authorized") {
    return (
      <Alert
        isInline
        variant={"warning"}
        title="Cluster is not authenticated against nodes"
        actionLinks={
          <AlertActionLink onClick={() => alert("Fix authentication")}>
            Fix authentication
          </AlertActionLink>
        }
        data-test={`cluster-issue ${issue.severity} ${issue.message}`}
      >
        Unauthenticated nodes:
        <ul>
          {[...new Set(issue.nodeList)].map(nodeName => (
            <li key={nodeName}>{nodeName}</li>
          ))}
        </ul>
      </Alert>
    );
  }
  return <IssueListIssueDefault issue={issue} />;
};
