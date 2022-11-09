import {combineReducers} from "redux";

import {AppReducer} from "app/store/reducers/appReducer";

import {apiToState} from "./apiToState";
import {Cluster, ClusterStatusService} from "./types";

export const clusterStatusDefault: Cluster = {
  name: "",
  status: "unknown",
  hasCibInfo: false,
  nodeList: [],
  resourceTree: [],
  fenceDeviceList: [],
  acls: {},
  issueList: [],
  summary: {
    nodesSeverity: "OK",
    resourcesSeverity: "OK",
    fenceDevicesSeverity: "OK",
    issuesSeverity: "OK",
  },
  resourceOnNodeStatusList: [],
  clusterProperties: {},
  nodeAttr: {},
  nodesUtilization: {},
};

const clusterData: AppReducer<ClusterStatusService["clusterData"]> = (
  state = clusterStatusDefault,
  action,
) => {
  switch (action.type) {
    case "CLUSTER.STATUS.FETCH.OK":
      return apiToState(action.payload);

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

    default:
      return state;
  }
};

export const clusterStatus = combineReducers<ClusterStatusService>({
  clusterData,
  dataFetchState,
});
