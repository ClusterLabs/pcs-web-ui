import React from "react";

import { Group } from "app/services/cluster/types";
import { IssueList } from "app/services/cluster";

const GroupDetail = ({ group }: {
  group: Group,
}) => (
  <IssueList issueList={group.issueList} />
);

export default GroupDetail;
