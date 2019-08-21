import React from "react";
import { Stack, StackItem } from "@patternfly/react-core";

import { ISSUE, Issue } from "app/services/cluster/types";
import { InlineAlert, StatusIco } from "app/components";


const mapSeverityToVariant = (severity: ISSUE) => (
  severity === ISSUE.ERROR
    ? InlineAlert.Variant.danger
    : InlineAlert.Variant.warning
);
const issueKey = (issue: Issue, index: any) => `${index}:${issue.message}`;

export const issuesToSummaryStatus = StatusIco.itemsToSummaryStatus(
  (issue: Issue) => (
    issue.severity === ISSUE.ERROR
      ? StatusIco.STATUS_MAP.ERROR
      : StatusIco.STATUS_MAP.WARNING
  ),
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
