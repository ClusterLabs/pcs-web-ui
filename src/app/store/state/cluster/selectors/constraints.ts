import { types } from "app/store";
import { Selector } from "app/store/types";
import { getCluster } from "./cluster";

export const getConstraints = (
  clusterUrlName: string,
): Selector<types.cluster.ConstraintPack[]> => (state) => {
  const constraintMap = getCluster(clusterUrlName)(state).constraints;
  if (!constraintMap) {
    return [];
  }
  const locations: types.cluster.ConstraintPack[] = (
    constraintMap.rsc_location || []
  ).map(constraint => ({ type: "LOCATION", constraint }));

  const colocations: types.cluster.ConstraintPack[] = (
    constraintMap.rsc_colocation || []
  ).map(constraint => ({ type: "COLOCATION", constraint }));

  const orders: types.cluster.ConstraintPack[] = (
    constraintMap.rsc_order || []
  ).map(constraint => ({
    type: "ORDER",
    constraint,
  }));

  const tickets: types.cluster.ConstraintPack[] = (
    constraintMap.rsc_ticket || []
  ).map(constraint => ({
    type: "TICKET",
    constraint,
  }));

  return [...locations, ...colocations, ...orders, ...tickets];
};
