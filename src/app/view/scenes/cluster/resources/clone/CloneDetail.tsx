import React from "react";

import { types } from "app/store";
import { IssueList } from "app/view/common";

const CloneDetail = ({ clone }: {
  clone: types.cluster.Clone,
}) => (
  <IssueList issueList={clone.issueList} />
);

export default CloneDetail;
