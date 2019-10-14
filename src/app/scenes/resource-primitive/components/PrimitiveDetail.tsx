import React from "react";

import { Primitive } from "app/services/cluster/types";
import { IssueList } from "app/services/cluster";

const PrimitiveDetail = ({ primitive }: {
  primitive: Primitive,
}) => (
  <IssueList issueList={primitive.issueList} />
);

export default PrimitiveDetail;
