import type {constraintPacks} from "./select";

type ConstraintPackList = ReturnType<typeof constraintPacks>;

type ExtractConstraint<TYPE extends ConstraintPackList[number]["type"]> =
  Extract<ConstraintPackList[number], {type: TYPE}>["constraint"];

export type ConstraintLocationRule = ExtractConstraint<"Location (rule)">;
export type ConstraintLocationNode = ExtractConstraint<"Location">;
export type ConstraintColocationPair = ExtractConstraint<"Colocation">;
export type ConstraintColocationSet = ExtractConstraint<"Colocation (set)">;
export type ConstraintOrderPair = ExtractConstraint<"Order">;
export type ConstraintOrderSet = ExtractConstraint<"Order (set)">;
export type ConstraintTicketResource = ExtractConstraint<"Ticket">;
export type ConstraintTicketSet = ExtractConstraint<"Ticket (set)">;

export type ConstraintResourceSet = (
  | ConstraintColocationSet
  | ConstraintOrderSet
  | ConstraintTicketSet
)["sets"][number];
