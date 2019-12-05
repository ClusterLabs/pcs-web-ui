import React from "react";

import { types } from "app/services/cluster";

import ConstraintRow from "./ConstraintRow";
import ConstraintCell from "./ConstraintCell";
import ConstraintCellOrderScoreKind from "./ConstraintCellOrderScoreKind";

const ConstraintRowOrder = ({ constraint, resourceId }: {
  constraint: types.ConstraintOrder;
  resourceId: string;
}) => {
  return (
    <ConstraintRow aria-labelledby={`Order constraint ${constraint.id}`}>
      <ConstraintCell label="Type" value="Order" />
      {constraint.firstResource.id === resourceId && (
        <ConstraintCell label="Before" value={constraint.thenResource.id} />
      )}
      {constraint.firstResource.id !== resourceId && (
        <ConstraintCell label="After" value={constraint.firstResource.id} />
      )}
      <ConstraintCellOrderScoreKind constraint={constraint} />
    </ConstraintRow>
  );
};

export default ConstraintRowOrder;
