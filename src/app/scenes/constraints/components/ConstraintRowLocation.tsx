import React from "react";

import { types } from "app/services/cluster";

import ConstraintRow from "./ConstraintRow";
import ConstraintCell from "./ConstraintCell";

const ConstraintRowLocation = ({ constraint }: {
  constraint: types.ConstraintLocation,
}) => {
  return (
    <ConstraintRow aria-labelledby={`Location constraint ${constraint.id}`}>
      <ConstraintCell label="Type" value="Location" />
      <ConstraintCell label="Node" value={constraint.node} />
      <ConstraintCell label="Score" value={constraint.score} />
    </ConstraintRow>
  );
};

export default ConstraintRowLocation;
