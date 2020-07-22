import * as types from "app/store/types";
import { Selector } from "app/store/types";

export const getResourceAgentMap = (
  clusterUrlName: string,
): Selector<types.resourceAgentList.ResourceAgentMap> => state =>
  state.clusterStorage[clusterUrlName]?.resourceAgentMap.data;
