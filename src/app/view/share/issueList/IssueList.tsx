import React from "react";
import { Stack, StackItem } from "@patternfly/react-core";

import { Issue } from "app/view/cluster/types";

import { IssueListEmpty } from "./IssueListEmpty";
import { IssueListIssueDefault } from "./IssueListIssueDefault";

const issueKey = (issue: Issue, index: string | number) =>
  `${index}:${issue.message}`;

export const IssueList = ({
  issueList,
  margin = false,
  hideEmpty = false,
  displayIssue = issue => <IssueListIssueDefault issue={issue} />,
  children,
}: {
  issueList: Issue[];
  margin?: boolean;
  hideEmpty?: boolean;
  displayIssue?: (_issue: Issue) => React.ReactNode;
  children?: React.ReactNode;
}) => {
  if (issueList.length === 0 && !children) {
    if (hideEmpty) {
      return null;
    }
    return <IssueListEmpty />;
  }
  return (
    <Stack
      hasGutter
      style={{ margin: margin ? "1rem" : "none" }}
      data-test="issues-status"
    >
      {children && <StackItem isFilled>{children}</StackItem>}
      {issueList.map((issue, i) => (
        <StackItem key={issueKey(issue, i)} isFilled>
          {displayIssue(issue)}
        </StackItem>
      ))}
    </Stack>
  );
};
