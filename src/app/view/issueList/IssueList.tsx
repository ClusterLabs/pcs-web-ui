import React from "react";
import { Stack, StackItem } from "@patternfly/react-core";

import { types } from "app/store";

import { IssueListEmpty } from "./IssueListEmpty";
import { IssueListIssueDefault } from "./IssueListIssueDefault";

const issueKey = (issue: types.cluster.Issue, index: string | number) =>
  `${index}:${issue.message}`;

export const IssueList: React.FC<{
  issueList: types.cluster.Issue[];
  margin?: boolean;
  hideEmpty?: boolean;
  displayIssue?: (issue: types.cluster.Issue) => React.ReactNode;
}> = ({
  issueList,
  margin = false,
  hideEmpty = false,
  displayIssue = issue => <IssueListIssueDefault issue={issue} />,
}) => {
  if (issueList.length === 0) {
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
      {issueList.map((issue, i) => (
        <StackItem key={issueKey(issue, i)} isFilled>
          {displayIssue(issue)}
        </StackItem>
      ))}
    </Stack>
  );
};
