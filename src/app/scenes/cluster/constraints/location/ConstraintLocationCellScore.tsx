import React from "react";
import { types } from "app/store";
import { ConstraintCell, ConstraintCellFake } from "../common";

export const ConstraintLocationCellScore: React.FC<{
  constraint: types.cluster.ConstraintLocationRule;
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
