import { Reducer, combineReducers } from "redux";

import { ResourcePrimitiveState } from "./types";
import * as ResourcePrimitiveAction from "./actions";

const storage: Reducer<ResourcePrimitiveState["storage"], (
  | ResourcePrimitiveAction.LoadResourceAgentSuccess
)> = (state = {}, action) => {
  switch (action.type) {
    case "RESOURCE_AGENT.LOAD.SUCCESS": return {
      ...state,
      [action.payload.apiAgentMetadata.name]: {
        parameters: action.payload.apiAgentMetadata.parameters,
      },
    };
    default: return state;
  }
};

export default combineReducers({
  storage,
});
