import { types } from "app/store";
import { Selector } from "app/store/types";

export const getFenceAgent = (
  agentName: string,
): Selector<types.pcmkAgents.FenceAgent> => state =>
  state.pcmkAgents[agentName];

export const getResourceAgent = (
  agentName: string,
): Selector<types.pcmkAgents.ResourceAgent> => state =>
  state.pcmkAgents[agentName];
