import * as types from "app/store/types";

export const clusterStatusDefault: types.cluster.ClusterStatus = {
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