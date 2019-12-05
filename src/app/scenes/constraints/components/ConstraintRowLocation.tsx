import React from "react";

import { types } from "app/services/cluster";

import ConstraintRow from "./ConstraintRow";
import ConstraintCell from "./ConstraintCell";

const getScore = (constraint: types.ConstraintLocation) => {
  if ("score" in constraint) {
    return constraint.score;
  }

  if ("score-attribute" in constraint) {
    return constraint["score-attribute"];
  }

  return "";
};

const ConstraintRowLocation = ({ constraint }: {
  constraint: types.ConstraintLocation,
}) => {
  const ariaLabel = `Location constraint ${constraint.id}`;
  if ("node" in constraint) {
    return (
      <ConstraintRow aria-labelledby={ariaLabel}>
        <ConstraintCell label="Type" value="Location" />
        <ConstraintCell label="Node" value={constraint.node} />
        <ConstraintCell label="Score" value={constraint.score} />
      </ConstraintRow>
    );
  }
  return (
    <ConstraintRow aria-labelledby={ariaLabel}>
      <ConstraintCell label="Type" value="Location (rule)" />
      <ConstraintCell label="Rule" value={constraint.rule_string} />
      <ConstraintCell label="Score" value={getScore(constraint)} />
    </ConstraintRow>
  );
};

export default ConstraintRowLocation;
