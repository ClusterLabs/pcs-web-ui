import {combineReducers} from "redux";

import {AppReducer} from "app/store/reducers/appReducer";

const clusterNameList: AppReducer<string[]> = (state = [], action) => {
  switch (action.type) {
    case "CLUSTER.LIST.FETCH.OK":
      return action.payload.clusterNameList;

    case "AUTH.REQUIRED":
      return [];

    default:
      return state;
  }
};

const dataFetch: AppReducer<"NOT_STARTED" | "IN_PROGRESS" | "SUCCESS"> = (
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
