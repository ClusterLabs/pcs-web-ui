import React from "react";

import { types } from "app/services/cluster";

import ConstraintRow from "./ConstraintRow";
import ConstraintCell from "./ConstraintCell";

const ConstraintLocation = ({ constraint }: {
  constraint: types.ConstraintLocation,
}) => {
  return (
    <ConstraintRow aria-labelledby={`Location constraint ${constraint.id}`}>
      <ConstraintCell key="type" label="Type" value="Location" />
      <ConstraintCell key="node" label="Node" value={constraint.node} />
      <ConstraintCell key="score" label="Score" value={constraint.score} />
    </ConstraintRow>
  );
};

export default ConstraintLocation;
