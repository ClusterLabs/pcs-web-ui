import {combineReducers} from "redux";

import type {AppReducer} from "app/store/reducers/appReducer";

import {cibSecrets} from "./cibSecrets";
import {clusterStatus} from "./clusterStatus";
import {pcmkAgents} from "./pcmkAgents";
import {clusterProperties} from "./properties";
import {clusterPermissions} from "./permissions";
import {resourceAgentMap} from "./resourceAgentMap";
import {fenceAgentList} from "./fenceAgentList";

const combined = combineReducers({
  cibSecrets,
  clusterStatus,
  pcmkAgents,
  clusterProperties,
  clusterPermissions,
  resourceAgentMap,
  fenceAgentList,
});

export type ClusterData = ReturnType<typeof combined>;

export const clusterData: AppReducer<ClusterData> = (state, action) =>
  action.type === "AUTH.REQUIRED" || action.type === "USER.PERMISSIONS_LOST"
    ? combined(undefined, action)
    : combined(state, action);
