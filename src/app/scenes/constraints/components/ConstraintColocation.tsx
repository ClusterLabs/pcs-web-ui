import React from "react";

import { types } from "app/services/cluster";

import ConstraintRow from "./ConstraintRow";
import ConstraintCell from "./ConstraintCell";

const ConstraintColocation = ({ constraint, resourceId }: {
  constraint: types.ConstraintColocation;
  resourceId: string;
}) => {
  return (
    <ConstraintRow aria-labelledby={`Colocation constraint ${constraint.id}`}>
      <ConstraintCell key="type" label="Type" value="Colocation" />
      <ConstraintCell
        key="node"
        label="With resource"
        value={
          constraint.firstResource.id === resourceId
            ? constraint.secondResource.id
            : constraint.firstResource.id
        }
      />
      <ConstraintCell key="score" label="Score" value={constraint.score} />
    </ConstraintRow>
  );
};

export default ConstraintColocation;
