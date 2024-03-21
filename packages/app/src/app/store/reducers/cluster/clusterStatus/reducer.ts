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

const load: AppReducer<ClusterStatusService["load"]> = (
  state = {
    result: "NO_DATA_YET",
    when: Date.now(),
    currently: false,
  },
  action,
) => {
  switch (action.type) {
    case "CLUSTER.STATUS.SYNC":
    case "CLUSTER.STATUS.REFRESH":
      return {
        ...state,
        currently: true,
      };

    case "CLUSTER.STATUS.FETCH.OK":
      return {
        ...state,
        result: "SUCCESS",
        when: Date.now(),
        currently: false,
      };

    case "CLUSTER.STATUS.FETCH.FAIL":
      return {
        ...state,
        currently: false,
      };

    case "CLUSTER.STATUS.BACKEND_NOT_FOUND":
      return {
        ...state,
        result:
          state.result === "NO_DATA_YET" ? "BACKEND_NOT_FOUND" : state.result,
        currently: false,
      };

    case "CLUSTER.STATUS.FETCH.FORBIDDEN":
      return {
        ...state,
        result: "FORBIDDEN",
        when: Date.now(),
        currently: false,
      };

    default:
      return state;
  }
};

export const clusterStatus = combineReducers<ClusterStatusService>({
  clusterData,
  load: load,
});
