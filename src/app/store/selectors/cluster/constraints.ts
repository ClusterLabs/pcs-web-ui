import * as types from "app/store/state/types";

import { clusterStatusSelector } from "./selectorsHelpers";

export const getConstraints = clusterStatusSelector((clusterStatus) => {
  const constraintMap = clusterStatus.constraints;
  if (!constraintMap) {
    return [];
  }
  const locationsNode: types.cluster.ConstraintPack[] = (
    constraintMap.rsc_location || []
  ).map(constraint =>
    ("node" in constraint
      ? { type: "Location", constraint }
      : { type: "Location (rule)", constraint }),
  );

  const colocations: types.cluster.ConstraintPack[] = (
    constraintMap.rsc_colocation || []
  ).map(constraint =>
    ("sets" in constraint
      ? { type: "Colocation (set)", constraint }
      : { type: "Colocation", constraint }),
  );

  const orders: types.cluster.ConstraintPack[] = (
    constraintMap.rsc_order || []
  ).map(constraint =>
    ("sets" in constraint
      ? { type: "Order (set)", constraint }
      : { type: "Order", constraint }),
  );

  const tickets: types.cluster.ConstraintPack[] = (
    constraintMap.rsc_ticket || []
  ).map(constraint =>
    ("sets" in constraint
      ? { type: "Ticket (set)", constraint }
      : { type: "Ticket", constraint }),
  );

  return [...locationsNode, ...colocations, ...orders, ...tickets];
});
