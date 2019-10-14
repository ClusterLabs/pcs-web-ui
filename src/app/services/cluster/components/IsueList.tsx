import React from "react";
import { Stack, StackItem } from "@patternfly/react-core";

import { InlineAlert } from "app/common/components";

import { Issue } from "../types";


const mapSeverityToVariant = (severity: Issue["severity"]) => (
  severity === "ERROR" ? "danger" : "warning"
);
const issueKey = (issue: Issue, index: any) => `${index}:${issue.message}`;

const IssueList = ({ issueList, margin = false }: {
  issueList: Issue[],
  margin?: boolean,
}) => (
  <Stack
    gutter="sm"
    style={{ margin: margin ? "1rem" : "none" }}
    data-role="issues-status"
  >
    {issueList.map((issue, i) => (
      <StackItem key={issueKey(issue, i)} isFilled aria-label="cluster issue">
        <InlineAlert
          variant={mapSeverityToVariant(issue.severity)}
          title={issue.message}
        />
      </StackItem>
    ))}
  </Stack>
);

export default IssueList;
