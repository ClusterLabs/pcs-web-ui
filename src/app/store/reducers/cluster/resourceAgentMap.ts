import { Reducer, combineReducers } from "app/store/redux";

export type ResourceAgentMap = Record<string, string[]>;
export type ResourceAgentListService = {
  data: ResourceAgentMap;
  fetchState: {
    current: "NOT_STARTED" | "LOADING" | "LOADED" | "RELOADING" | "FAILED";
    alreadyLoaded: boolean;
  };
};

function getAgents<T>(agentMap: Record<string, T>): T[] {
  return Object.values(agentMap);
}

const data: Reducer<ResourceAgentMap> = (state = {}, action) => {
  switch (action.type) {
    case "RESOURCE_AGENT.LIST.LOAD.OK":
      return getAgents(action.payload.apiResourceAgentMap).reduce<
        ResourceAgentMap
      >(
        (resourceAgentMap: ResourceAgentMap, apiResourceAgent) => ({
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

const fetchState: Reducer<ResourceAgentListService["fetchState"]> = (
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

export default combineReducers({
  data,
  fetchState,
});
