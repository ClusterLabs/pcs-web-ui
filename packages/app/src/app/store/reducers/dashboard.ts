import {combineReducers} from "redux";

import {AppReducer} from "app/store/reducers/appReducer";

const clusterNameList: AppReducer<string[]> = (state = [], action) => {
  switch (action.type) {
    case "CLUSTER.LIST.FETCH.OK":
      return action.payload.clusterNameList;

    case "AUTH.REQUIRED":
    case "USER.PERMISSIONS_LOST":
      return [];

    default:
      return state;
  }
};

const dataFetch: AppReducer<
  "NOT_STARTED" | "IN_PROGRESS" | "BACKEND_NOT_FOUND" | "SUCCESS"
> = (state = "NOT_STARTED", action) => {
  switch (action.type) {
    case "CLUSTER.LIST.SYNC":
      // Status IN_PROGRESS is used only when data hasn't been already fetched -
      // i.e. first time
      return state === "SUCCESS" ? "SUCCESS" : "IN_PROGRESS";

    case "CLUSTER.LIST.FETCH.OK":
      return "SUCCESS";

    case "CLUSTER.LIST.BACKEND_NOT_FOUND":
      // Status BACKEND_NOT_FOUND is used only when data hasn't been already
      // fetched - i.e. first time
      return state === "SUCCESS" ? "SUCCESS" : "BACKEND_NOT_FOUND";

    case "AUTH.REQUIRED":
    case "USER.PERMISSIONS_LOST":
      return "NOT_STARTED";

    default:
      return state;
  }
};

export const dashboard = combineReducers({
  clusterNameList,
  dataFetch,
});
