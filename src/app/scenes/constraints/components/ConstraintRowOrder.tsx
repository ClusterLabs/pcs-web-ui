import React from "react";

import { types } from "app/services/cluster";
import ConstraintCellResourceSet from "./ConstraintCellResourceSet";

import ConstraintRow from "./ConstraintRow";
import ConstraintCell from "./ConstraintCell";
import ConstraintCellOrderScoreKind from "./ConstraintCellOrderScoreKind";

const ConstraintRowOrder = ({ constraint, resourceId }: {
  constraint: types.ConstraintOrder;
  resourceId: string;
}) => {
  if ("sets" in constraint) {
    return (
      <ConstraintRow aria-labelledby={`Order constraint ${constraint.id}`}>
        <ConstraintCell label="Type" value="Order (set)" />
        <ConstraintCellResourceSet resourceSetList={constraint.sets} />
        <ConstraintCellOrderScoreKind constraint={constraint} />
      </ConstraintRow>
    );
  }
  return (
    <ConstraintRow aria-labelledby={`Order constraint ${constraint.id}`}>
      <ConstraintCell label="Type" value="Order" />
      {constraint.first === resourceId && (
        <ConstraintCell label="Before" value={constraint.then} />
      )}
      {constraint.then === resourceId && (
        <ConstraintCell label="After" value={constraint.first} />
      )}
      <ConstraintCellOrderScoreKind constraint={constraint} />
    </ConstraintRow>
  );
};

export default ConstraintRowOrder;
