import React from "react";
import { useSelector } from "react-redux";
import { DataList } from "@patternfly/react-core";

import { Primitive } from "app/services/cluster/types";

import PrimitiveConstraint from "./PrimitiveConstraint";
import * as selectors from "../selectors";

const PrimitiveConstraintList = ({ primitive }: {
  primitive: Primitive,
}) => {
  const constraintList = useSelector(
    selectors.getConstraintsForResource(primitive),
  );
  return (
    <DataList aria-label={`Constraints of resource ${primitive.id}`}>
      {constraintList.map(constraint => (
        <PrimitiveConstraint constraint={constraint} key={constraint.id} />
      ))}
    </DataList>
  );
};

export default PrimitiveConstraintList;
