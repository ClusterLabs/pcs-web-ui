import React from "react";

import { types } from "app/store";

import { ConstraintCell } from "../common";

export const ConstraintCellOrderScoreKind = ({
  constraint,
}: {
  constraint:
    | types.cluster.ConstraintOrderPair
    | types.cluster.ConstraintOrderSet;
}) => {
  // score and kind are mutually exclusive
  if ("score" in constraint) {
    return <ConstraintCell label="Score" value={constraint.score} width={1} />;
  }
  return (
    <ConstraintCell
      label="Kind"
      value={"kind" in constraint ? constraint.kind : "Mandatory"}
      width={1}
    />
  );
};
