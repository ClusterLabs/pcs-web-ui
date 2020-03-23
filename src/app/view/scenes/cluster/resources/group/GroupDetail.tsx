import React from "react";
import { StackItem } from "@patternfly/react-core";

import { types } from "app/store";
import { IssueList } from "app/view/common";

export const GroupDetail = ({ group }: {
  group: types.cluster.Group,
}) => (
  <StackItem>
    <IssueList issueList={group.issueList} hideEmpty />
  </StackItem>
);
