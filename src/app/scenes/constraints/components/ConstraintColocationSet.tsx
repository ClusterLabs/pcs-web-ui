import React from "react";

import { types } from "app/services/cluster";

import ConstraintRow from "./ConstraintRow";
import ConstraintCell from "./ConstraintCell";
import ConstraintCellResourceSet from "./ConstraintCellResourceSet";

const ConstraintColocationSet = ({ constraint }: {
  constraint: types.ConstraintColocationSet,
}) => {
  return (
    <ConstraintRow aria-labelledby={`Colocation constraint ${constraint.id}`}>
      <ConstraintCell label="Type" value="Colocation (set)" />
      <ConstraintCellResourceSet resourceSetList={constraint.sets} />
      <ConstraintCell label="Score" value={constraint.score} />
    </ConstraintRow>
  );
};

export default ConstraintColocationSet;
