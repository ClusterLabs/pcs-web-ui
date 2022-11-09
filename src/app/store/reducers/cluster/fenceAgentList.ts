import {combineReducers} from "redux";

import {uprefixFenceAgentName} from "app/store/tools";
import {AppReducer} from "app/store/reducers/appReducer";

type FenceAgentList = string[];
type FenceAgentListService = {
  data: FenceAgentList;
  fetchState: {
    current: "NOT_STARTED" | "LOADING" | "LOADED" | "RELOADING" | "FAILED";
    alreadyLoaded: boolean;
  };
};

const data: AppReducer<FenceAgentList> = (state = [], action) => {
  switch (action.type) {
    case "FENCE_AGENT.LIST.LOAD.OK":
      return action.payload.apiFenceAgentList.map(apiAgent =>
        uprefixFenceAgentName(apiAgent.name),
      );

    default:
      return state;
  }
};

const fetchState: AppReducer<FenceAgentListService["fetchState"]> = (
  state = {current: "NOT_STARTED", alreadyLoaded: false},
  action,
) => {
  switch (action.type) {
    case "FENCE_AGENT.LIST.LOAD.OK":
      return {
        current: "LOADED",
        alreadyLoaded: true,
      };

    case "FENCE_AGENT.LIST.LOAD":
      return {
        ...state,
        current: state.alreadyLoaded ? "RELOADING" : "LOADING",
      };

    case "FENCE_AGENT.LIST.LOAD.FAIL":
      return {
        ...state,
        current: "FAILED",
      };

    default:
      return state;
  }
};

export const fenceAgentList = combineReducers({
  data,
  fetchState,
});
