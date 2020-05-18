import { ClusterState } from "./types";

export const clusterStatusDefault: ClusterState = {
  name: "",
  urlName: "",
  status: "UNKNOWN",
  statusSeverity: "UNKNOWN",
  nodeList: [],
  resourceTree: [],
  fenceDeviceList: [],
  issueList: [],
  summary: {
    nodesSeverity: "UNKNOWN",
    resourcesSeverity: "UNKNOWN",
    fenceDevicesSeverity: "UNKNOWN",
    issuesSeverity: "UNKNOWN",
  },
  resourceOnNodeStatusList: [],
};
