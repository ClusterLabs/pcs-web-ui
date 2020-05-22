import { ClusterState } from "./types";

export const clusterStatusDefault: ClusterState = {
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
