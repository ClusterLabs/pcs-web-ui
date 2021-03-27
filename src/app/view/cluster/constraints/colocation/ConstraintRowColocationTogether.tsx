import React from "react";

import { ConstraintColocationPair, ConstraintColocationSet } from "../types";

type Colocation = ConstraintColocationPair | ConstraintColocationSet;

const isTogether = (constraint: Colocation) =>
  constraint.score === "INFINITY"
  || (constraint.score
    && typeof constraint.score === "number"
    && constraint.score > 0);

export const ConstraintRowColocationTogether: React.FC<{
  constraint: Colocation;
}> = ({ constraint }) => {
  return <>{` are ${isTogether(constraint) ? "together" : "separate"}`}</>;
};
