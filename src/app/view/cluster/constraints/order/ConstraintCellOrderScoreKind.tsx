import React from "react";

import { types } from "app/store";

import { ConstraintCell, ConstraintCellFake } from "../common";

type ConstraintOrder =
  | types.cluster.ConstraintOrderPair
  | types.cluster.ConstraintOrderSet;

export const ConstraintCellOrderScoreKind: React.FC<{
  constraint: ConstraintOrder;
  extraScore?: Extract<ConstraintOrder, { score?: unknown }>["score"];
}> = ({ constraint, extraScore = undefined }) => {
  // score and kind are mutually exclusive
  if ("score" in constraint) {
    return (
      <ConstraintCell
        label="Score"
        value={extraScore || constraint.score}
        width={1}
      />
    );
  }
  if ("kind" in constraint) {
    return (
      <ConstraintCell
        label="Kind"
        value={"kind" in constraint ? constraint.kind : "Mandatory"}
        width={1}
      />
    );
  }
  if (extraScore) {
    return <ConstraintCell label="Score" value={extraScore} width={1} />;
  }
  return <ConstraintCellFake />;
};
