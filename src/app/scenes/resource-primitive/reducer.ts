import { Reducer, combineReducers } from "redux";

import { Action } from "app/common/actions";

import { ResourcePrimitiveState } from "./types";

const storage: Reducer<ResourcePrimitiveState["storage"], Action> = (
  state = {},
  action,
) => {
  switch (action.type) {
    case "RESOURCE_AGENT.LOAD": return {
      ...state,
      [action.payload.agentName]: state[action.payload.agentName]
        ? {
          ...state[action.payload.agentName],
          loadStatus: "RELOADING",
        }
        : {
          loadStatus: "LOADING",
          parameters: [],
        }
      ,
    };
    case "RESOURCE_AGENT.LOAD.SUCCESS": return {
      ...state,
      [action.payload.apiAgentMetadata.name]: {
        loadStatus: "LOADED",
        parameters: action.payload.apiAgentMetadata.parameters,
      },
    };
    case "RESOURCE_AGENT.LOAD.FAILED": return {
      ...state,
      [action.payload.agentName]: {
        loadStatus: "FAILED",
        parameters: [],
      },
    };
    default: return state;
  }
};

export default combineReducers({
  storage,
});
