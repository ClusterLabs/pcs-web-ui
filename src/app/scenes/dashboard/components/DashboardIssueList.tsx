import React from "react";
import { Stack, StackItem } from "@patternfly/react-core";

import { ISSUE, Issue } from "app/services/cluster/types";
import { InlineAlert, StatusIco } from "app/common/components";


const mapSeverityToVariant = (severity: ISSUE) => (
  severity === "ERROR" ? "danger" : "warning"
);
const issueKey = (issue: Issue, index: any) => `${index}:${issue.message}`;

export const issuesToSummaryStatus = StatusIco.itemsToSummaryStatus(
  (issue: Issue) => (issue.severity === "ERROR" ? "ERROR" : "WARNING"),
);

const DashboardIssueList = ({ issueList }: { issueList: Issue[] }) => (
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
