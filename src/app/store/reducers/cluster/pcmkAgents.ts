import { AppReducer } from "app/store/reducers/appReducer";
import { ActionPayload } from "app/store/actions";
import { uprefixFenceAgentName } from "app/store/tools";

type Params =
  | ActionPayload["RESOURCE_AGENT.LOAD.SUCCESS"]["apiAgentMetadata"]["parameters"]
  | ActionPayload["FENCE_AGENT.LOAD.SUCCESS"]["apiAgentMetadata"]["parameters"];

type AgentMap = Record<
  string,
  {
    loadStatus: "LOADING" | "LOADED" | "RELOADING" | "FAILED";
    name: string;
    shortdesc: string | null;
    longdesc: string | null;
    parameters: Params;
  }
>;

export const pcmkAgents: AppReducer<AgentMap> = (state = {}, action) => {
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
    case "FENCE_AGENT.LOAD.SUCCESS": {
      const agentName = uprefixFenceAgentName(
        action.payload.apiAgentMetadata.name,
      );
      return {
        ...state,
        [agentName]: {
          loadStatus: "LOADED",
          name: agentName,
          parameters: action.payload.apiAgentMetadata.parameters,
          shortdesc: action.payload.apiAgentMetadata.shortdesc,
          longdesc: action.payload.apiAgentMetadata.longdesc,
        },
      };
    }

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
