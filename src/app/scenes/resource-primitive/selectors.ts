import { RootState, Selector } from "app/core/types";

import { ResourcePrimitiveState, ResourceAgentMetadata } from "./types";

const localState: Selector<RootState, ResourcePrimitiveState> = (
  state => state.resourcePrimitive
);

export const getResourceAgent = (
  agentName: string,
): Selector<RootState, ResourceAgentMetadata> => (
  state => localState(state).storage[agentName]
);
