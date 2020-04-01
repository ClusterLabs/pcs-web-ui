import React from "react";
import { StackItem } from "@patternfly/react-core";

import { types } from "app/store";
import { IssueList } from "app/view/common";

export const CloneDetail = ({ clone }: {
  clone: types.cluster.Clone;
}) => (
  <StackItem>
    <IssueList issueList={clone.issueList} hideEmpty />
  </StackItem>
);
