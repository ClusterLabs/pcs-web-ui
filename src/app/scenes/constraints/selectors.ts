import { RootState } from "app/core/types";
import { ResourceTreeItem, ResourceSet } from "app/services/cluster/types";


const setsContainResourceId = (sets: ResourceSet[], resourceId: string) => (
  sets.some(resourceSet => (
    "resourceIdList" in resourceSet
    &&
    resourceSet.resourceIdList.includes(resourceId)
  ))
);

export const getConstraintsForResource = (
  resource: ResourceTreeItem,
) => (
  state: RootState,
) => state.cluster.clusterState.constraints.filter(constraint => (
  (
    (constraint.type === "LOCATION" || constraint.type === "LOCATION.RULE")
    &&
    constraint.resourceRelation.type === "RESOURCE-ID"
    &&
    constraint.resourceRelation.value === resource.id
  )
  ||
  (
    (constraint.type === "COLOCATION")
    &&
    (
      constraint.firstResource.id === resource.id
      ||
      constraint.secondResource.id === resource.id
    )
  )
  ||
  (
    constraint.type === "COLOCATION.SET"
    &&
    setsContainResourceId(constraint.sets, resource.id)
  )
  ||
  (
    constraint.type === "ORDER"
    &&
    (
      constraint.firstResource.id === resource.id
      ||
      constraint.thenResource.id === resource.id
    )
  )
  ||
  (
    constraint.type === "ORDER.SET"
    &&
    setsContainResourceId(constraint.sets, resource.id)
  )
));
