import { ConstraintCell, ConstraintCellFake } from "../common";
import { ConstraintOrderPair, ConstraintOrderSet } from "../types";

type ConstraintOrder = ConstraintOrderPair | ConstraintOrderSet;

export const ConstraintCellOrderScoreKind = ({
  constraint,
  extraScore = undefined,
}: {
  constraint: ConstraintOrder;
  extraScore?: Extract<ConstraintOrder, { score?: unknown }>["score"];
}) => {
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
