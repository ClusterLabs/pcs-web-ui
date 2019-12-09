import React from "react";

import { types } from "app/store";
import { IssueList } from "app/services/cluster";

const GroupDetail = ({ group }: {
  group: types.cluster.Group,
}) => (
  <IssueList issueList={group.issueList} />
);

export default GroupDetail;
