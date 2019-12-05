import { RootState } from "app/core/types";
import { types } from "app/services/cluster";

type Pack = (
  |{ type: "LOCATION", constraint: types.ConstraintLocation }
  |{ type: "COLOCATION", constraint: types.ConstraintColocation }
  |{ type: "ORDER", constraint: types.ConstraintOrder }
);

const setsContainId = (sets: types.ConstraintResourceSet[], id: string) => (
  sets.some(resourceSet => (
    "resources" in resourceSet
    &&
    resourceSet.resources.includes(id)
  ))
);

export const getConstraintsForResource = (
  resource: types.ResourceTreeItem,
) => (
  state: RootState,
): Pack[] => {
  const constraintMap = state.cluster.clusterState.constraints;
  if (!constraintMap) {
    return [];
  }

  const locations: Pack[] = (constraintMap.rsc_location || [])
    .filter(c => "rsc" in c && c.rsc === resource.id)
    .map(constraint => ({ type: "LOCATION", constraint }))
  ;

  const colocations: Pack[] = (constraintMap.rsc_colocation || [])
    .filter(c => (
      ("sets" in c && setsContainId(c.sets, resource.id))
      ||
      ("rsc" in c && c.rsc === resource.id)
      ||
      ("with-rsc" in c && c["with-rsc"] === resource.id)
    ))
    .map(constraint => ({ type: "COLOCATION", constraint }))
  ;

  const orders: Pack[] = (constraintMap.rsc_order || [])
    .filter(c => (
      ("sets" in c && setsContainId(c.sets, resource.id))
      ||
      ("first" in c && c.first === resource.id)
      ||
      ("then" in c && c.then === resource.id)
    ))
    .map(constraint => ({ type: "ORDER", constraint }))
  ;

  return [
    ...locations,
    ...colocations,
    ...orders,
  ];
};
