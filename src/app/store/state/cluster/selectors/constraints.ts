import { types } from "app/store";
import { Selector } from "app/store/types";
import { getCluster } from "./cluster";

const setsContainId = (
  sets: types.cluster.ConstraintResourceSet[],
  id: string,
) =>
  sets.some(
    resourceSet =>
      "resources" in resourceSet && resourceSet.resources.includes(id),
  );

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

export const resourceGetConstraints = (
  clusterUrlName: string,
  resource: types.cluster.ResourceTreeItem,
): Selector<types.cluster.ConstraintPack[]> => (state) => {
  const constraintMap = getCluster(clusterUrlName)(state).constraints;
  if (!constraintMap) {
    return [];
  }

  const locations: types.cluster.ConstraintPack[] = (
    constraintMap.rsc_location || []
  )
    .filter(c => "rsc" in c && c.rsc === resource.id)
    .map(constraint => ({ type: "LOCATION", constraint }));

  const colocations: types.cluster.ConstraintPack[] = (
    constraintMap.rsc_colocation || []
  )
    .filter(
      c =>
        ("sets" in c && setsContainId(c.sets, resource.id))
        || ("rsc" in c && c.rsc === resource.id)
        || ("with-rsc" in c && c["with-rsc"] === resource.id),
    )
    .map(constraint => ({ type: "COLOCATION", constraint }));

  const orders: types.cluster.ConstraintPack[] = (constraintMap.rsc_order || [])
    .filter(
      c =>
        ("sets" in c && setsContainId(c.sets, resource.id))
        || ("first" in c && c.first === resource.id)
        || ("then" in c && c.then === resource.id),
    )
    .map(constraint => ({ type: "ORDER", constraint }));

  const tickets: types.cluster.ConstraintPack[] = (
    constraintMap.rsc_ticket || []
  )
    .filter(
      c =>
        ("sets" in c && setsContainId(c.sets, resource.id))
        || ("rsc" in c && c.rsc === resource.id),
    )
    .map(constraint => ({ type: "TICKET", constraint }));

  return [...locations, ...colocations, ...orders, ...tickets];
};
