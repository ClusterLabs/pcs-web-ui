import { combineReducers } from "redux";

import { Reducer, ReturnTypeWithoutCombinedState } from "../tools";

import { clusterStatus } from "./clusterStatus";
import { pcmkAgents } from "./pcmkAgents";
import { resourceTree } from "./resourceTree";
import { clusterProperties } from "./properties";
import { resourceAgentMap } from "./resourceAgentMap";
import { taskResourceCreate } from "./taskResourceCreate";
import { taskConstraintLocationCreate } from "./taskConstraintLocationCreate";
import { taskConstraintOrderCreate } from "./taskConstraintOrderCreate";
import { taskConstraintOrderSetCreate } from "./taskConstraintOrderSetCreate";
import { taskResourceGroup } from "./taskResourceGroup";
import { taskNodeAdd } from "./taskNodeAdd";
import { fixAuth } from "./fixAuth";

const clusterStorageItem = combineReducers({
  clusterStatus,
  pcmkAgents,
  resourceTree,
  clusterProperties,
  resourceAgentMap,
  taskResourceCreate,
  taskConstraintLocationCreate,
  taskConstraintOrderCreate,
  taskConstraintOrderSetCreate,
  taskResourceGroup,
  taskNodeAdd,
  fixAuth,
});

type ClusterStorage = Record<
  string,
  ReturnTypeWithoutCombinedState<typeof clusterStorageItem>
>;

export const clusterStorage: Reducer<ClusterStorage> = (state = {}, action) => {
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
