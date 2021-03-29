import { Cluster } from "../types";

import { clusterSelector } from "./selectorsHelpers";

type Constraints = NonNullable<Cluster["constraints"]>;

type ExtractConstraint<GROUP extends keyof Constraints, SHAPE> = Extract<
  NonNullable<Constraints[GROUP]>[number],
  SHAPE
>;

type LocationNode = ExtractConstraint<"rsc_location", { node: string }>;
type LocationRule = ExtractConstraint<"rsc_location", { rule_string: string }>;
type ColocationPair = ExtractConstraint<"rsc_colocation", { rsc: string }>;
type ColocationSet = ExtractConstraint<"rsc_colocation", { sets: unknown }>;
type OrderPair = ExtractConstraint<"rsc_order", { first: string }>;
type OrderSet = ExtractConstraint<"rsc_order", { sets: unknown }>;
type TicketResource = ExtractConstraint<"rsc_ticket", { rsc: string }>;
type TicketSet = ExtractConstraint<"rsc_ticket", { sets: unknown }>;

export type ConstraintPack =
  | { type: "Location"; constraint: LocationNode }
  | { type: "Location (rule)"; constraint: LocationRule }
  | { type: "Colocation"; constraint: ColocationPair }
  | { type: "Colocation (set)"; constraint: ColocationSet }
  | { type: "Order"; constraint: OrderPair }
  | { type: "Order (set)"; constraint: OrderSet }
  | { type: "Ticket"; constraint: TicketResource }
  | { type: "Ticket (set)"; constraint: TicketSet };

export const getConstraints = clusterSelector((clusterStatus) => {
  const constraintMap = clusterStatus.constraints;
  if (!constraintMap) {
    return [];
  }
  const locationsNode: ConstraintPack[] = (
    constraintMap.rsc_location || []
  ).map(constraint =>
    "node" in constraint
      ? { type: "Location", constraint }
      : { type: "Location (rule)", constraint },
  );

  const colocations: ConstraintPack[] = (
    constraintMap.rsc_colocation || []
  ).map(constraint =>
    "sets" in constraint
      ? { type: "Colocation (set)", constraint }
      : { type: "Colocation", constraint },
  );

  const orders: ConstraintPack[] = (
    constraintMap.rsc_order || []
  ).map(constraint =>
    "sets" in constraint
      ? { type: "Order (set)", constraint }
      : { type: "Order", constraint },
  );

  const tickets: ConstraintPack[] = (
    constraintMap.rsc_ticket || []
  ).map(constraint =>
    "sets" in constraint
      ? { type: "Ticket (set)", constraint }
      : { type: "Ticket", constraint },
  );

  return [...locationsNode, ...colocations, ...orders, ...tickets];
});
