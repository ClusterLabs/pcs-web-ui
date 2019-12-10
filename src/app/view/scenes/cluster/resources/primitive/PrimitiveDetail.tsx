import React from "react";

import { types } from "app/store";
import { IssueList } from "app/view/common";

const PrimitiveDetail = ({ primitive }: {
  primitive: types.cluster.Primitive,
}) => (
  <IssueList issueList={primitive.issueList} />
);

export default PrimitiveDetail;
