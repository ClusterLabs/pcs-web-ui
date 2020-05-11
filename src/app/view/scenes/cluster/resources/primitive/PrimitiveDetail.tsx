import React from "react";
import { StackItem } from "@patternfly/react-core";

import { types } from "app/store";
import { IssueList } from "app/view/common";

import { PrimitiveStatus } from "./PrimitiveStatus";

export const PrimitiveDetail = ({
  primitive,
}: {
  primitive: types.cluster.Primitive;
}) => (
  <>
    <StackItem>
      <IssueList issueList={primitive.issueList} hideEmpty />
    </StackItem>
    <StackItem>
      <PrimitiveStatus primitive={primitive} />
    </StackItem>
  </>
);
