import React from "react";

import { types } from "app/store";
import { IssueList } from "app/services/cluster";

const CloneDetail = ({ clone }: {
  clone: types.cluster.Clone,
}) => (
  <IssueList issueList={clone.issueList} />
);

export default CloneDetail;
