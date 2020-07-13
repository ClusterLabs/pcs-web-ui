import * as types from "app/store/types";
import { Selector } from "app/store/types";

export const getPcmkAgent = (
  clusterUrlName: string,
  agentName: string,
): Selector<types.pcmkAgents.Agent> => state =>
  state.clusterStorage[clusterUrlName]?.pcmkAgents[agentName];
