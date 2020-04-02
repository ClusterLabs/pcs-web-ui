import { Selector } from "../types";

import { ResourceAgentMetadata } from "./types";

export const getResourceAgent = (
  agentName: string,
): Selector<ResourceAgentMetadata> => state =>
  state.resourceAgents.storage[agentName];
