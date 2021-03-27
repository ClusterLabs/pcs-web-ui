import { combineReducers } from "redux";

import { Reducer } from "./tools";

const clusterNameList: Reducer<string[]> = (state = [], action) => {
  switch (action.type) {
    case "CLUSTER.LIST.FETCH.OK":
      return action.payload.clusterNameList;
    case "AUTH.REQUIRED":
      return [];
    default:
      return state;
  }
};

const dataFetch: Reducer<"NOT_STARTED" | "IN_PROGRESS" | "SUCCESS"> = (
  state = "NOT_STARTED",
  action,
) => {
  switch (action.type) {
    case "CLUSTER.LIST.SYNC":
      return state === "SUCCESS" ? "SUCCESS" : "IN_PROGRESS";
    case "CLUSTER.LIST.FETCH.OK":
      return "SUCCESS";
    case "AUTH.REQUIRED":
      return "NOT_STARTED";
    default:
      return state;
  }
};

export const dashboard = combineReducers({
  clusterNameList,
  dataFetch,
});
