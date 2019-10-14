import React from "react";

import { Clone } from "app/services/cluster/types";
import { IssueList } from "app/services/cluster";

const CloneDetail = ({ clone }: {
  clone: Clone,
}) => (
  <IssueList issueList={clone.issueList} />
);

export default CloneDetail;
