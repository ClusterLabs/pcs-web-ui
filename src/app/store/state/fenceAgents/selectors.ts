import { types } from "app/store";
import { Selector } from "app/store/types";

export const getFenceAgent = (
  agentName: string,
): Selector<types.fenceAgents.FenceAgentMetadata> => state =>
  state.fenceAgents.storage[agentName];
