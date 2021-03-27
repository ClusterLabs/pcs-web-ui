import React from "react";

import { ConstraintLocationRule } from "../types";
import { ConstraintCell, ConstraintCellFake } from "../common";

export const ConstraintLocationCellScore: React.FC<{
  constraint: ConstraintLocationRule;
}> = ({ constraint }) => {
  if ("score" in constraint) {
    return <ConstraintCell label="Score" value={constraint.score} width={1} />;
  }
  if ("score-attribute" in constraint) {
    return (
      <ConstraintCell
        label="Score attribute"
        value={constraint["score-attribute"]}
        width={1}
      />
    );
  }
  return <ConstraintCellFake />;
};
