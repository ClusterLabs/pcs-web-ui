import {combineReducers} from "redux";

import {AppReducer} from "app/store/reducers/appReducer";

import {apiToState} from "./apiToState";
import {ClusterStatusService} from "./types";

const clusterData: AppReducer<ClusterStatusService["clusterData"]> = (
  state = null,
  action,
) => {
  switch (action.type) {
    case "CLUSTER.STATUS.FETCH.OK":
      return apiToState(action.payload);

    case "CLUSTER.STATUS.FETCH.FORBIDDEN":
      return null;

    default:
      return state;
  }
};

const dataFetchState: AppReducer<ClusterStatusService["dataFetchState"]> = (
  state = "NOT_STARTED",
  action,
) => {
  switch (action.type) {
    case "CLUSTER.STATUS.SYNC":
      return state === "SUCCESS" ? "SUCCESS" : "IN_PROGRESS";

    case "CLUSTER.STATUS.FETCH.OK":
      return "SUCCESS";

    case "CLUSTER.STATUS.FETCH.FORBIDDEN":
      return "FORBIDDEN";

    default:
      return state;
  }
};

export const clusterStatus = combineReducers<ClusterStatusService>({
  clusterData,
  dataFetchState,
});
