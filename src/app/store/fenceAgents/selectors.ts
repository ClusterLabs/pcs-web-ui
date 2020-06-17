import { Selector } from "../types";

import { FenceAgentMetadata } from "./types";

export const getFenceAgent = (
  agentName: string,
): Selector<FenceAgentMetadata> => state =>
  state.fenceAgents.storage[agentName];
