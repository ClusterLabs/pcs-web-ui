import { Reducer, combineReducers } from "redux";

import { Action } from "app/store/actions";
import * as types from "app/store/types";

type ResourceAgentMap = types.resourceAgentList.ResourceAgentMap;

const data: Reducer<ResourceAgentMap, Action> = (state = {}, action) => {
  switch (action.type) {
    case "RESOURCE_AGENT_LIST.LOAD.SUCCESS":
      return Object.values(action.payload.apiResourceAgentMap).reduce<
        ResourceAgentMap
      >(
        (resourceAgentMap, apiResourceAgent) => ({
          ...resourceAgentMap,
          [apiResourceAgent.class_provider]: [
            ...(resourceAgentMap[apiResourceAgent.class_provider] ?? []),
            apiResourceAgent.type,
          ],
        }),
        {},
      );

    default:
      return state;
  }
};

const fetchState: Reducer<
  types.resourceAgentList.ResourceAgentListService["fetchState"],
  Action
> = (state = { current: "NOT_STARTED", alreadyLoaded: false }, action) => {
  switch (action.type) {
    case "RESOURCE_AGENT_LIST.LOAD.SUCCESS":
      return {
        current: "LOADED",
        alreadyLoaded: true,
      };
    case "RESOURCE_AGENT_LIST.LOAD":
      return {
        ...state,
        current: state.alreadyLoaded ? "RELOADING" : "LOADING",
      };
    case "RESOURCE_AGENT_LIST.LOAD.FAILED":
      return {
        ...state,
        current: "FAILED",
      };
    default:
      return state;
  }
};

export default combineReducers({
  data,
  fetchState,
});
