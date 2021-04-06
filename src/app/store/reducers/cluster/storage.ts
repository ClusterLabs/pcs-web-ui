import { combineReducers } from "redux";

import { AppReducer } from "app/store/reducers/appReducer";

import { clusterStatus } from "./clusterStatus";
import { pcmkAgents } from "./pcmkAgents";
import { resourceTree } from "./resourceTree";
import { clusterProperties } from "./properties";
import { resourceAgentMap } from "./resourceAgentMap";
import { tasks } from "./tasks";

const clusterStorageItem = combineReducers({
  clusterStatus,
  pcmkAgents,
  resourceTree,
  clusterProperties,
  resourceAgentMap,
  tasks,
});

type ClusterStorage = Record<string, ReturnType<typeof clusterStorageItem>>;

export const clusterStorage: AppReducer<ClusterStorage> = (
  state = {},
  action,
) => {
  if (action.type === "AUTH.REQUIRED") {
    return {};
  }
  if ("key" in action && "clusterName" in action.key) {
    return {
      ...state,
      [action.key.clusterName]: clusterStorageItem(
        state[action.key.clusterName],
        action,
      ),
    };
  }
  return Object.keys(state).reduce<ClusterStorage>(
    (newState, clusterName) => ({
      ...newState,
      [clusterName]: clusterStorageItem(state[clusterName], action),
    }),
    {} as ClusterStorage,
  );
};
