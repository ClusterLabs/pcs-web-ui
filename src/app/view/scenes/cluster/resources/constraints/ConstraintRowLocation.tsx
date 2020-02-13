import React from "react";

import { types } from "app/store";

import { ConstraintRow } from "./ConstraintRow";
import { ConstraintCell } from "./ConstraintCell";

const getScore = (constraint: types.cluster.ConstraintLocation) => {
  if ("score" in constraint) {
    return constraint.score;
  }

  if ("score-attribute" in constraint) {
    return constraint["score-attribute"];
  }

  return "";
};

export const ConstraintRowLocation = ({ constraint }: {
  constraint: types.cluster.ConstraintLocation,
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
