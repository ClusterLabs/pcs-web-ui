import { combineReducers } from "redux";

import { ActionPayload } from "app/store/actions";
import { AppReducer } from "app/store/reducers/appReducer";

type ResourceAgentMap = Record<string, string[]>;
type ResourceAgentListService = {
  data: ResourceAgentMap;
  fetchState: {
    current: "NOT_STARTED" | "LOADING" | "LOADED" | "RELOADING" | "FAILED";
    alreadyLoaded: boolean;
  };
};

type ApiAgentMap =
  ActionPayload["RESOURCE_AGENT.LIST.LOAD.OK"]["apiResourceAgentMap"];

function getAgents<T>(agentMap: Record<string, T>): T[] {
  return Object.values(agentMap);
}

const getClassProvider = (apiAgent: ApiAgentMap[keyof ApiAgentMap]): string => {
  if ("class_provider" in apiAgent && apiAgent.class_provider) {
    return apiAgent.class_provider;
  }

  if (apiAgent.provider !== null) {
    return `${apiAgent.class}:${apiAgent.provider}`;
  }

  return apiAgent.class;
};

const groupAgentNamesByClassProvider = (apiAgentMap: ApiAgentMap) => {
  return getAgents(apiAgentMap).reduce<ResourceAgentMap>(
    (resourceAgentMap: ResourceAgentMap, apiAgent) => {
      const classProvider = getClassProvider(apiAgent);
      return {
        ...resourceAgentMap,
        [classProvider]: [
          ...(resourceAgentMap[classProvider] ?? []),
          apiAgent.type,
        ],
      };
    },
    {},
  );
};

const data: AppReducer<ResourceAgentMap> = (state = {}, action) => {
  switch (action.type) {
    case "RESOURCE_AGENT.LIST.LOAD.OK":
      return groupAgentNamesByClassProvider(action.payload.apiResourceAgentMap);

    default:
      return state;
  }
};

const fetchState: AppReducer<ResourceAgentListService["fetchState"]> = (
  state = { current: "NOT_STARTED", alreadyLoaded: false },
  action,
) => {
  switch (action.type) {
    case "RESOURCE_AGENT.LIST.LOAD.OK":
      return {
        current: "LOADED",
        alreadyLoaded: true,
      };

    case "RESOURCE_AGENT.LIST.LOAD":
      return {
        ...state,
        current: state.alreadyLoaded ? "RELOADING" : "LOADING",
      };

    case "RESOURCE_AGENT.LIST.LOAD.FAIL":
      return {
        ...state,
        current: "FAILED",
      };

    default:
      return state;
  }
};

export const resourceAgentMap = combineReducers({
  data,
  fetchState,
});
