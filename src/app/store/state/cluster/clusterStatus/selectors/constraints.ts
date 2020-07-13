import * as types from "app/store/types";
import { Selector } from "app/store/types";

import { getCluster } from "./cluster";

export const getConstraints = (
  clusterUrlName: string,
): Selector<types.cluster.ConstraintPack[]> => (state) => {
  const constraintMap = getCluster(clusterUrlName)(state).constraints;
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
};
