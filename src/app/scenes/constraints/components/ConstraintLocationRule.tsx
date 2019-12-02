import React from "react";
import { types } from "app/services/cluster";

import ConstraintRow from "./ConstraintRow";
import ConstraintCell from "./ConstraintCell";

const ConstraintLocationRule = ({ constraint }: {
  constraint: types.ConstraintLocationRule,
}) => {
  return (
    <ConstraintRow aria-labelledby={`Location constraint ${constraint.id}`}>
      <ConstraintCell key="type" label="Type" value="Location (rule)" />
      <ConstraintCell key="rule" label="Rule" value={constraint.ruleString} />
      <ConstraintCell
        key="score"
        label="Score"
        value={constraint.ruleScore.value}
      />
    </ConstraintRow>
  );
};

export default ConstraintLocationRule;
