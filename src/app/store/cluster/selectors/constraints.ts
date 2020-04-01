import { Selector } from "../../types";

import {
  ResourceTreeItem,
  ConstraintLocation,
  ConstraintColocation,
  ConstraintOrder,
  ConstraintTicket,
  ConstraintResourceSet,
} from "../types";

type Pack = (
  |{ type: "LOCATION"; constraint: ConstraintLocation }
  |{ type: "COLOCATION"; constraint: ConstraintColocation }
  |{ type: "ORDER"; constraint: ConstraintOrder }
  |{ type: "TICKET"; constraint: ConstraintTicket }
);

const setsContainId = (sets: ConstraintResourceSet[], id: string) => (
  sets.some(resourceSet => (
    "resources" in resourceSet
    &&
    resourceSet.resources.includes(id)
  ))
);

export const resourceGetConstraints = (
  resource: ResourceTreeItem,
): Selector<Pack[]> => (state) => {
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

  const tickets: Pack[] = (constraintMap.rsc_ticket || [])
    .filter(c => (
      ("sets" in c && setsContainId(c.sets, resource.id))
      ||
      ("rsc" in c && c.rsc === resource.id)
    ))
    .map(constraint => ({ type: "TICKET", constraint }))
  ;

  return [
    ...locations,
    ...colocations,
    ...orders,
    ...tickets,
  ];
};
