import React from "react";

import { types } from "app/store";
import { IssueList, IssueListIssueDefault } from "app/view/share";

import { ClusterIssueNotAuth } from "./ClusterIssueNotAuth";

type Issue = types.cluster.Issue;

const isNoAuthIssue = (issue: Issue): issue is types.cluster.IssueNotAuth =>
  "type" in issue && issue.type === "nodes_not_authorized";

const compareIssuesOrder = (i1: Issue, i2: Issue) => {
  if (isNoAuthIssue(i1)) {
    return -1;
  }
  if (isNoAuthIssue(i2)) {
    return 1;
  }
  return 0;
};

export const ClusterIssueList: React.FC<{ issueList: Issue[] }> = ({
  issueList,
}) => {
  return (
    <IssueList
      issueList={issueList.sort(compareIssuesOrder)}
      hideEmpty
      displayIssue={(issue) => {
        if (isNoAuthIssue(issue)) {
          return <ClusterIssueNotAuth nodeList={issue.nodeList} />;
        }
        return <IssueListIssueDefault issue={issue} />;
      }}
    />
  );
};
