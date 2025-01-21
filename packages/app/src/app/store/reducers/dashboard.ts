import {combineReducers} from "redux";

import type {AppReducer} from "app/store/reducers/appReducer";

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

const dataFetch: AppReducer<{
  status: "NOT_STARTED" | "IN_PROGRESS" | "BACKEND_NOT_FOUND" | "SUCCESS";
  currently: boolean;
  when: number;
}> = (
  state = {status: "NOT_STARTED", when: Date.now(), currently: false},
  action,
) => {
  switch (action.type) {
    case "CLUSTER.LIST.SYNC":
      // Status IN_PROGRESS is used only when data hasn't been already fetched -
      // i.e. first time
      return {
        ...state,
        currently: true,
        status: state.status === "SUCCESS" ? "SUCCESS" : "IN_PROGRESS",
      };

    case "CLUSTER.LIST.FETCH.OK":
      return {
        ...state,
        status: "SUCCESS",
        when: Date.now(),
        currently: false,
      };

    case "CLUSTER.LIST.BACKEND_NOT_FOUND":
      // Status BACKEND_NOT_FOUND is used only when data hasn't been already
      // fetched - i.e. first time
      return {
        ...state,
        status: state.status === "SUCCESS" ? "SUCCESS" : "BACKEND_NOT_FOUND",
        currently: false,
      };

    case "AUTH.REQUIRED":
    case "USER.PERMISSIONS_LOST":
      return {
        ...state,
        status: "NOT_STARTED",
        when: Date.now(),
        currently: false,
      };

    default:
      return state;
  }
};

export const dashboard = combineReducers({
  clusterNameList,
  dataFetch,
});
