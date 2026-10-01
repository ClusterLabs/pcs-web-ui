import {combineReducers} from "redux";

import {CLUSTER_KEY} from "app/store/clusterStorageKey";
import type {AppReducer} from "app/store/reducers/appReducer";

import {cibSecrets} from "./cibSecrets";
import {clusterStatus} from "./clusterStatus";
import {pcmkAgents} from "./pcmkAgents";
import {clusterProperties} from "./properties";
import {clusterPermissions} from "./permissions";
import {resourceAgentMap} from "./resourceAgentMap";
import {fenceAgentList} from "./fenceAgentList";

const clusterStorageItem = combineReducers({
  cibSecrets,
  clusterStatus,
  pcmkAgents,
  clusterProperties,
  clusterPermissions,
  resourceAgentMap,
  fenceAgentList,
});

type ClusterStorage = Record<string, ReturnType<typeof clusterStorageItem>>;

export const clusterStorage: AppReducer<ClusterStorage> = (
  state = {},
  action,
) => {
  if (
    action.type === "AUTH.REQUIRED" ||
    action.type === "USER.PERMISSIONS_LOST"
  ) {
    return {};
  }
  if ("key" in action && "clusterName" in action.key) {
    // Single-cluster model: every keyed action collapses onto the constant
    // CLUSTER_KEY regardless of the clusterName carried by the action. The
    // follow-up de-keying ticket will remove clusterName from the actions
    // entirely.
    return {
      ...state,
      [CLUSTER_KEY]: clusterStorageItem(state[CLUSTER_KEY], action),
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
