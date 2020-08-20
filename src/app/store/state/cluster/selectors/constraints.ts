import * as types from "app/store/types";
import { clusterStatusSelector } from "./helpers";

export const getConstraints = clusterStatusSelector((clusterStatus) => {
  const constraintMap = clusterStatus.constraints;
  if (!constraintMap) {
    return [];
  }
  const locationsNode: types.cluster.ConstraintPack[] = (
    constraintMap.rsc_location || []
  ).map(constraint =>
    ("node" in constraint
      ? { type: "LOCATION_NODE", constraint }
      : { type: "LOCATION_RULE", constraint }),
  );

  const colocations: types.cluster.ConstraintPack[] = (
    constraintMap.rsc_colocation || []
  ).map(constraint =>
    ("sets" in constraint
      ? { type: "COLOCATION_SET", constraint }
      : { type: "COLOCATION_PAIR", constraint }),
  );

  const orders: types.cluster.ConstraintPack[] = (
    constraintMap.rsc_order || []
  ).map(constraint =>
    ("sets" in constraint
      ? { type: "ORDER_SET", constraint }
      : { type: "ORDER_PAIR", constraint }),
  );

  const tickets: types.cluster.ConstraintPack[] = (
    constraintMap.rsc_ticket || []
  ).map(constraint =>
    ("sets" in constraint
      ? { type: "TICKET_SET", constraint }
      : { type: "TICKET_RESOURCE", constraint }),
  );

  return [...locationsNode, ...colocations, ...orders, ...tickets];
});
