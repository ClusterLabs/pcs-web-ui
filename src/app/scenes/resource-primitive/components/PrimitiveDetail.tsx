import React from "react";

import { types } from "app/store";
import { IssueList } from "app/services/cluster";

const PrimitiveDetail = ({ primitive }: {
  primitive: types.cluster.Primitive,
}) => (
  <IssueList issueList={primitive.issueList} />
);

export default PrimitiveDetail;
