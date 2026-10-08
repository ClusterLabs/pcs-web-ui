import {combineReducers} from "redux";

import type {AppReducer} from "app/store/reducers/appReducer";

import {cibSecrets} from "./cibSecrets";
import {clusterStatus} from "./clusterStatus";
import {pcmkAgents} from "./pcmkAgents";
import {clusterProperties} from "./properties";
import {clusterPermissions} from "./permissions";
import {resourceAgentMap} from "./resourceAgentMap";
import {fenceAgentList} from "./fenceAgentList";

const clusterDataItem = combineReducers({
  cibSecrets,
  clusterStatus,
  pcmkAgents,
  clusterProperties,
  clusterPermissions,
  resourceAgentMap,
  fenceAgentList,
});

export type ClusterData = ReturnType<typeof clusterDataItem>;

export const clusterData: AppReducer<ClusterData | null> = (
  state = null,
  action,
) => {
  if (
    action.type === "AUTH.REQUIRED" ||
    action.type === "USER.PERMISSIONS_LOST"
  ) {
    return null;
  }
  if ("key" in action && "clusterName" in action.key) {
    // Single-cluster model: the clusterName carried by the action is ignored.
    // A keyed cluster action lazily initializes the slot and updates it. The
    // follow-up de-keying ticket will remove clusterName from the actions
    // entirely.
    return clusterDataItem(state ?? undefined, action);
  }
  // Actions without clusterName propagate to sub-reducers only once cluster
  // data already exists (mirrors the original Object.keys(state).reduce over
  // existing slots). While state is null it stays null => isRegistered: false.
  return state === null ? null : clusterDataItem(state, action);
};
