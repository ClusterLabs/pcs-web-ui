import { types } from "app/store";
import { Selector } from "app/store/types";

export const getResourceAgent = (
  agentName: string,
): Selector<types.resourceAgents.ResourceAgentMetadata> => state =>
  state.resourceAgents.storage[agentName];
