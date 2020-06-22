import { Reducer } from "redux";

import { Action } from "app/actions";
import { types } from "app/store";

const storage: Reducer<types.pcmkAgents.AgentsStorage, Action> = (
  state = {},
  action,
) => {
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
