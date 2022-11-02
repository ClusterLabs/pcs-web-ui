import {Issue} from "app/view/cluster/types";
import {Card, IssueList, IssueListIssueDefault} from "app/view/share";

import {ClusterIssueNotAuth} from "./ClusterIssueNotAuth";

type IssueNotAuth = Extract<Issue, {type: "nodes_not_authorized"}>;

const isNoAuthIssue = (issue: Issue): issue is IssueNotAuth =>
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

export const IssuesCard = ({issueList}: {issueList: Issue[]}) => {
  if (issueList.length === 0) {
    return null;
  }
  return (
    <Card title="Issues">
      <IssueList
        issueList={issueList.sort(compareIssuesOrder)}
        hideEmpty
        displayIssue={issue => {
          if (isNoAuthIssue(issue)) {
            return <ClusterIssueNotAuth nodeList={issue.nodeList} />;
          }
          return <IssueListIssueDefault issue={issue} />;
        }}
      />
    </Card>
  );
};
