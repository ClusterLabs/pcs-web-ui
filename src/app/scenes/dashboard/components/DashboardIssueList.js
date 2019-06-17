import React from "react";
import { Stack, StackItem } from "@patternfly/react-core";
import { StyledConstants, StyledBox } from "@patternfly/react-styled-system";

import { ISSUE } from "app/services/cluster/status-constants";
import { InlineAlert } from "app/components";

const { space } = StyledConstants;

const mapSeverityToVariant = severity => (
  severity === ISSUE.ERROR ? "danger" : "warning"
);
const mapSeverityToText = severity => (
  severity === ISSUE.ERROR ? "error" : "warning"
);
const issueKey = (issue, index) => `${index}:${issue.message}`;
const summaryStatus = issueList => issueList.reduce(
  (sumStatus, issue) => (sumStatus === "error"
    ? sumStatus
    : mapSeverityToText(issue.severity)
  ),
  "ok",
);

const DashboardIssueList = ({ issueList }) => (
  <StyledBox
    m={space.lg}
    data-role="issues-status"
    data-role-value={summaryStatus(issueList)}
  >
    <Stack gutter="sm">
      {issueList.map((issue, i) => (
        <StackItem key={issueKey(issue, i)} isFilled>
          <InlineAlert
            variant={mapSeverityToVariant(issue.severity)}
            title={issue.message}
          />
        </StackItem>
      ))}
    </Stack>
  </StyledBox>
);

export default DashboardIssueList;
