import React from "react";
import { DataList } from "@patternfly/react-core";

import { Primitive } from "app/services/cluster/types";

import PrimitiveConstraint from "./PrimitiveConstraint";

const PrimitiveConstraintList = ({ primitive }: {
  primitive: Primitive,
}) => {
  return (
    <DataList aria-label={`Constraints of resource ${primitive.id}`}>
      {primitive.constraints.map(constraint => (
        <PrimitiveConstraint constraint={constraint} key={constraint.id} />
      ))}
    </DataList>
  );
};

export default PrimitiveConstraintList;
