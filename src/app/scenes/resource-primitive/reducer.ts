import { Reducer, combineReducers } from "redux";

import { ResourcePrimitiveState } from "./types";
import * as ResourcePrimitiveAction from "./actions";

const storage: Reducer<ResourcePrimitiveState["storage"], (
  | ResourcePrimitiveAction.LoadResourceAgent
  | ResourcePrimitiveAction.LoadResourceAgentSuccess
  | ResourcePrimitiveAction.LoadResourceAgentFailed
)> = (state = {}, action) => {
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
