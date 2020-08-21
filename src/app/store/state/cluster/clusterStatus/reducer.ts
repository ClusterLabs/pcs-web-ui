import { Reducer, combineReducers } from "redux";

import { Action } from "app/store/actions";

import { apiToState } from "./apiToState";
import { ClusterStatus, ClusterStatusService } from "./types";

export const clusterStatusDefault: ClusterStatus = {
  name: "",
  urlName: "",
  nodeList: [],
  resourceTree: [],
  fenceDeviceList: [],
  issueList: [],
  summary: {
    nodesSeverity: "OK",
    resourcesSeverity: "OK",
    fenceDevicesSeverity: "OK",
    issuesSeverity: "OK",
  },
  resourceOnNodeStatusList: [],
};

const clusterData: Reducer<ClusterStatusService["clusterData"], Action> = (
  state = clusterStatusDefault,
  action,
) => {
  switch (action.type) {
    case "CLUSTER_DATA.FETCH.SUCCESS":
      return apiToState(action.payload.apiClusterStatus);
    default:
      return state;
  }
};

const dataFetchState: Reducer<
  ClusterStatusService["dataFetchState"],
  Action
> = (state = "NOT_STARTED", action) => {
  switch (action.type) {
    case "CLUSTER_DATA.SYNC":
      return state === "SUCCESS" ? "SUCCESS" : "IN_PROGRESS";
    case "CLUSTER_DATA.FETCH.SUCCESS":
      return "SUCCESS";
    case "CLUSTER_DATA.FETCH.FAILED":
      return state === "IN_PROGRESS" ? "ERROR" : state;
    default:
      return state;
  }
};

const clusterStatus = combineReducers<ClusterStatusService>({
  clusterData,
  dataFetchState,
});
export default clusterStatus;
