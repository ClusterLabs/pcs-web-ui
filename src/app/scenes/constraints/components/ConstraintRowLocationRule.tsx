import React from "react";
import { types } from "app/services/cluster";

import ConstraintRow from "./ConstraintRow";
import ConstraintCell from "./ConstraintCell";

const ConstraintRowLocationRule = ({ constraint }: {
  constraint: types.ConstraintLocationRule,
}) => {
  return (
    <ConstraintRow aria-labelledby={`Location constraint ${constraint.id}`}>
      <ConstraintCell label="Type" value="Location (rule)" />
      <ConstraintCell label="Rule" value={constraint.ruleString} />
      <ConstraintCell label="Score" value={constraint.ruleScore.value} />
    </ConstraintRow>
  );
};

export default ConstraintRowLocationRule;
