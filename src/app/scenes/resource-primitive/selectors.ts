import { RootState, Selector } from "app/core/types";
import { ResourceTreeItem } from "app/services/cluster/types";

import { ResourcePrimitiveState, ResourceAgentMetadata } from "./types";

const localState: Selector<RootState, ResourcePrimitiveState> = (
  state => state.resourcePrimitive
);

export const getResourceAgent = (
  agentName: string,
): Selector<RootState, ResourceAgentMetadata> => (
  state => localState(state).storage[agentName]
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
    constraint.type === "COLOCATION"
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
    constraint.sets.some(resourceSet => (
      "resourceIdList" in resourceSet
      &&
      resourceSet.resourceIdList.includes(resource.id)
    ))
  )
));
