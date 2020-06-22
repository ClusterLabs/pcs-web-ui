import { types } from "app/store";
import { Selector } from "app/store/types";

export const getPcmkAgent = (
  agentName: string,
): Selector<types.pcmkAgents.Agent> => state => state.pcmkAgents[agentName];
