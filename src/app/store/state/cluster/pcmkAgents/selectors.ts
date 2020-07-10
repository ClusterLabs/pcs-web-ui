import { types } from "app/store";
import { Selector } from "app/store/types";

export const getPcmkAgent = (
  clusterUrlName: string,
  agentName: string,
): Selector<types.pcmkAgents.Agent> => state =>
  state.clusterStorage[clusterUrlName]?.pcmkAgents[agentName];
