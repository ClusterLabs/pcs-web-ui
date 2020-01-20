import React from "react";
import { StackItem } from "@patternfly/react-core";

import { types } from "app/store";
import { IssueList } from "app/view/common";

const GroupDetail = ({ group }: {
  group: types.cluster.Group,
}) => (
  <StackItem>
    <IssueList issueList={group.issueList} />
  </StackItem>
);

export default GroupDetail;
