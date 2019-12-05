import React from "react";

import { types } from "app/services/cluster";

import ConstraintRow from "./ConstraintRow";
import ConstraintCell from "./ConstraintCell";
import ConstraintCellResourceSet from "./ConstraintCellResourceSet";
import ConstraintCellOrderScoreKind from "./ConstraintCellOrderScoreKind";

const ConstraintRowOrderSet = ({ constraint }: {
  constraint: types.ConstraintOrderSet,
}) => {
  return (
    <ConstraintRow aria-labelledby={`Order constraint ${constraint.id}`}>
      <ConstraintCell label="Type" value="Order (set)" />
      <ConstraintCellResourceSet resourceSetList={constraint.sets} />
      <ConstraintCellOrderScoreKind constraint={constraint} />
    </ConstraintRow>
  );
};

export default ConstraintRowOrderSet;
