import { Reducer } from "app/store/redux";

export type AgentParameter = {
  name: string;
  shortdesc: string;
  longdesc: string;
  default: string | number | null;
  advanced: boolean;
  required: boolean;
};
export type Agent = {
  loadStatus: "LOADING" | "LOADED" | "RELOADING" | "FAILED";
  name: string;
  shortdesc: string;
  longdesc: string;
  parameters: AgentParameter[];
};

export type ResourceAgentParameter = AgentParameter;
export type ResourceAgent = Agent;

export type FenceAgentParameter = AgentParameter & {
  deprecated: boolean;
};
export type FenceAgent = Agent & {
  parameters: FenceAgentParameter[];
};

export type StoredAgent = ResourceAgent | FenceAgent;

export type AgentsStorage = Record<string, StoredAgent>;

const storage: Reducer<AgentsStorage> = (state = {}, action) => {
  switch (action.type) {
    case "RESOURCE_AGENT.LOAD":
    case "FENCE_AGENT.LOAD":
      return {
        ...state,
        [action.payload.agentName]: state[action.payload.agentName]
          ? {
            ...state[action.payload.agentName],
            loadStatus: "RELOADING",
          }
          : {
            loadStatus: "LOADING",
            name: action.payload.agentName,
            parameters: [],
            shortdesc: "",
            longdesc: "",
          },
      };
    case "RESOURCE_AGENT.LOAD.SUCCESS":
    case "FENCE_AGENT.LOAD.SUCCESS":
      return {
        ...state,
        [action.payload.apiAgentMetadata.name]: {
          loadStatus: "LOADED",
          name: action.payload.apiAgentMetadata.name,
          parameters: action.payload.apiAgentMetadata.parameters,
          shortdesc: action.payload.apiAgentMetadata.shortdesc,
          longdesc: action.payload.apiAgentMetadata.longdesc,
        },
      };
    case "FENCE_AGENT.LOAD.FAILED":
    case "RESOURCE_AGENT.LOAD.FAILED":
      return {
        ...state,
        [action.payload.agentName]: {
          loadStatus: "FAILED",
          name: action.payload.agentName,
          parameters: [],
          shortdesc: "",
          longdesc: "",
        },
      };
    default:
      return state;
  }
};

export default storage;
