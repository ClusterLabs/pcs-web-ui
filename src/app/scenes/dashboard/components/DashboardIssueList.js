import React from "react";
import { Stack, StackItem } from "@patternfly/react-core";

import { ISSUE } from "app/services/cluster/status-constants";
import { InlineAlert } from "app/components";


const mapSeverityToVariant = severity => (
  severity === ISSUE.ERROR ? "danger" : "warning"
);
const mapSeverityToText = severity => (
  severity === ISSUE.ERROR ? "error" : "warning"
);
const issueKey = (issue, index) => `${index}:${issue.message}`;

export const issuesToSummaryStatus = issueList => issueList.reduce(
  (sumStatus, issue) => (sumStatus === "error"
    ? sumStatus
    : mapSeverityToText(issue.severity)
  ),
  "ok",
);

const DashboardIssueList = ({ issueList }) => (
  <Stack
    gutter="sm"
    style={{ margin: "1rem" }}
    data-role="issues-status"
    data-role-value={issuesToSummaryStatus(issueList)}
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

export default DashboardIssueList;
