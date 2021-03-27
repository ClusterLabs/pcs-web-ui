import { combineReducers } from "redux";

import { Reducer } from "../../tools";

import { apiToState } from "./apiToState";
import { ClusterStatus, ClusterStatusService } from "./types";

export const clusterStatusDefault: ClusterStatus = {
  name: "",
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
  nodeAttr: {},
  nodesUtilization: {},
  sbdDetection: null,
};

const clusterData: Reducer<ClusterStatusService["clusterData"]> = (
  state = clusterStatusDefault,
  action,
) => {
  switch (action.type) {
    case "CLUSTER.STATUS.FETCH.OK":
      return apiToState(action.payload.apiClusterStatus);
    default:
      return state;
  }
};

const dataFetchState: Reducer<ClusterStatusService["dataFetchState"]> = (
  state = "NOT_STARTED",
  action,
) => {
  switch (action.type) {
    case "CLUSTER.STATUS.SYNC":
      return state === "SUCCESS" ? "SUCCESS" : "IN_PROGRESS";
    case "CLUSTER.STATUS.FETCH.OK":
      return "SUCCESS";
    default:
      return state;
  }
};

export const clusterStatus = combineReducers<ClusterStatusService>({
  clusterData,
  dataFetchState,
});
