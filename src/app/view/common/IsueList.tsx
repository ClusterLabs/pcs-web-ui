import React from "react";
import { Stack, StackItem, Alert } from "@patternfly/react-core";
import { NoItemCase } from "app/view/common";

import { types } from "app/store";


const mapSeverityToVariant = (severity: types.cluster.Issue["severity"]) => (
  severity === "ERROR" ? "danger" : "warning"
);
const issueKey = (issue: types.cluster.Issue, index: any) => (
  `${index}:${issue.message}`
);

export const IssueList = ({ issueList, margin = false }: {
  issueList: types.cluster.Issue[],
  margin?: boolean,
}) => {
  if (issueList.length === 0) {
    return(
      <NoItemCase
        message="No issue."
        margin={margin}
        role="issues-status"
      />
    );
  }
  return (
    <Stack
      gutter="sm"
      style={{ margin: margin ? "1rem" : "none" }}
      data-role="issues-status"
    >
      {issueList.map((issue, i) => (
        <StackItem key={issueKey(issue, i)} isFilled aria-label="cluster issue">
          <Alert
            isInline
            variant={mapSeverityToVariant(issue.severity)}
            title={issue.message}
          />
        </StackItem>
      ))}
      {issueList.length === 0 && (
      <StackItem isFilled aria-label="no cluster issue">
        <Alert variant="info" isInline title="No issue" />
      </StackItem>
      )}
    </Stack>
  );
};
