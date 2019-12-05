import React from "react";

import { types } from "app/services/cluster";

import ConstraintRow from "./ConstraintRow";
import ConstraintCell from "./ConstraintCell";
import ConstraintCellResourceSet from "./ConstraintCellResourceSet";

const ConstraintRowColocation = ({ constraint, resourceId }: {
  constraint: types.ConstraintColocation;
  resourceId: string;
}) => {
  if ("sets" in constraint) {
    return (
      <ConstraintRow aria-labelledby={`Colocation constraint ${constraint.id}`}>
        <ConstraintCell label="Type" value="Colocation (set)" />
        <ConstraintCellResourceSet resourceSetList={constraint.sets} />
        <ConstraintCell label="Score" value={constraint.score} />
      </ConstraintRow>
    );
  }
  return (
    <ConstraintRow aria-labelledby={`Colocation constraint ${constraint.id}`}>
      <ConstraintCell label="Type" value="Colocation" />
      <ConstraintCell
        label="With resource"
        value={
          constraint.rsc === resourceId
            ? constraint["with-rsc"]
            : constraint.rsc
        }
      />
      <ConstraintCell label="Score" value={constraint.score} />
    </ConstraintRow>
  );
};

export default ConstraintRowColocation;
