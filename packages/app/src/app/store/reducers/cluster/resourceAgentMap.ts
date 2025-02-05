import {combineReducers} from "redux";

import type {ActionPayload} from "app/store/actions";
import type {AppReducer} from "app/store/reducers/appReducer";

type ResourceAgentMap = Record<string, string[]> | null;
type ResourceAgentListService = {
  data: ResourceAgentMap;
  fetchState: {
    current: "NOT_STARTED" | "LOADING" | "LOADED" | "RELOADING" | "FAILED";
    alreadyLoaded: boolean;
  };
};

const parseName = (name: string) => {
  const result =
    /^(?<standard>systemd|service):(?<type>[^:@]+@.*)$/.exec(name) ||
    /^(?<standard>[^:]+)(:(?<provider>[^:]+))?:(?<type>[^:]+)$/.exec(name);

  if (result === null) {
    return null;
  }

  const provider = result.groups?.provider ?? null;
  // "standard" is always here (according to regexp) but typescript complains
  // [tsserver 2532] [E] Object is possibly 'undefined'.
  const cls = result.groups?.standard ?? "";

  return {
    groupName: provider === null ? cls : `${cls}:${provider}`,
    // "type" is always here (according to regexp) but typescript complains
    // [tsserver 2532] [E] Object is possibly 'undefined'.
    agentName: result.groups?.type ?? "",
  };
};

type AgentNameStructure = NonNullable<ReturnType<typeof parseName>>;

const groupByClassProvider = (
  grouped: NonNullable<ResourceAgentMap>,
  {groupName, agentName}: AgentNameStructure,
) => ({
  ...grouped,
  [groupName]: [...(grouped[groupName] ?? []), agentName],
});

const groupAgentNames = (
  apiAgents: ActionPayload["RESOURCE_AGENT.LIST.LOAD.OK"]["apiResourceAgentList"],
) =>
  apiAgents
    .map(a => parseName(a.name))
    .filter((a): a is AgentNameStructure => a !== null)
    .reduce(groupByClassProvider, {});

const data: AppReducer<ResourceAgentMap> = (state = null, action) => {
  switch (action.type) {
    case "RESOURCE_AGENT.LIST.LOAD.OK":
      return groupAgentNames(action.payload.apiResourceAgentList);

    default:
      return state;
  }
};

const fetchState: AppReducer<ResourceAgentListService["fetchState"]> = (
  state = {current: "NOT_STARTED", alreadyLoaded: false},
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
