import { Reducer, combineReducers } from "redux";

import { Action } from "app/store/actions";
import * as types from "app/store/types";

import { clusterStatus } from "./clusterStatus/reducer";
import pcmkAgents from "./pcmkAgents/reducer";
import resourceTree from "./resourceTree/reducer";
import clusterProperties from "./clusterProperties/reducer";
import resourceAgentMap from "./resourceAgentList/reducer";

const cluster = combineReducers<types.clusterStorage.Item>({
  clusterStatus,
  pcmkAgents,
  resourceTree,
  clusterProperties,
  resourceAgentMap,
});

const clusterStorage: Reducer<types.clusterStorage.Map, Action> = (
  state = {},
  action,
) => {
  switch (action.type) {
    case "CLUSTER_DATA.SYNC":
    case "CLUSTER_DATA.FETCH.SUCCESS":
    case "CLUSTER_DATA.FETCH.FAILED":
    case "RESOURCE_AGENT.LOAD":
    case "RESOURCE_AGENT.LOAD.SUCCESS":
    case "RESOURCE_AGENT.LOAD.FAILED":
    case "FENCE_AGENT.LOAD":
    case "FENCE_AGENT.LOAD.SUCCESS":
    case "FENCE_AGENT.LOAD.FAILED":
    case "RESOURCE_TREE.ITEM.TOGGLE":
    case "CLUSTER_PROPERTIES.LOAD":
    case "CLUSTER_PROPERTIES.LOAD.SUCCESS":
    case "CLUSTER_PROPERTIES.LOAD.FAILED":
    case "RESOURCE_AGENT_LIST.LOAD":
    case "RESOURCE_AGENT_LIST.LOAD.SUCCESS":
    case "RESOURCE_AGENT_LIST.LOAD.FAILED":
      /* eslint-disable no-case-declarations */
      const name = action.payload.clusterUrlName;
      return {
        ...state,
        [name]: cluster(state[name], action),
      };
    case "AUTH.REQUIRED":
      return {};
    default:
      return state;
  }
};

export default clusterStorage;
