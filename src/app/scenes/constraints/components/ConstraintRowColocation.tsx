import React from "react";

import { types } from "app/services/cluster";

import ConstraintRow from "./ConstraintRow";
import ConstraintCell from "./ConstraintCell";

const ConstraintRowColocation = ({ constraint, resourceId }: {
  constraint: types.ConstraintColocation;
  resourceId: string;
}) => {
  return (
    <ConstraintRow aria-labelledby={`Colocation constraint ${constraint.id}`}>
      <ConstraintCell label="Type" value="Colocation" />
      <ConstraintCell
        label="With resource"
        value={
          constraint.firstResource.id === resourceId
            ? constraint.secondResource.id
            : constraint.firstResource.id
        }
      />
      <ConstraintCell label="Score" value={constraint.score} />
    </ConstraintRow>
  );
};

export default ConstraintRowColocation;
