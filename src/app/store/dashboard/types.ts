import { types } from "../cluster";

export interface Node {
  name: string,
  status: types.NodeStatusFlag,
  statusSeverity: types.StatusSeverity,
  quorum: types.NodeQuorumFlag,
  quorumSeverity: types.StatusSeverity,
  issueList: types.Issue[],
}

export interface ResourceTreeItem {
  id: string,
  itemType: "primitive"|"group"|"clone",
  status: "RUNNING"|"BLOCKED"|"FAILED"|"UNKNOWN"|"DISABLED",
  statusSeverity: types.StatusSeverity,
  issueList: types.Issue[],
}

export interface FenceDevice {
  id: string,
  status: "RUNNING"|"BLOCKED"|"FAILED"|"UNKNOWN"|"DISABLED",
  statusSeverity: types.StatusSeverity,
  issueList: types.Issue[],
}

export interface ClusterState {
  name: string,
  urlName: string,
  status: "OK"|"WARNING"|"ERROR"|"UNKNOWN",
  nodeList: Node[],
  resourceTree: ResourceTreeItem[],
  fenceDeviceList: FenceDevice[],
  issueList: types.Issue[],
  summary: {
    nodesSeverity: types.StatusSeverity,
    resourcesSeverity: types.StatusSeverity,
    fenceDevicesSeverity: types.StatusSeverity,
    issuesSeverity: types.StatusSeverity,
  },
}

export type FETCH_STATUS = "NOT_STARTED"|"IN_PROGRESS"|"SUCCESS"|"ERROR"

export interface DashboardState {
  clusterList: ClusterState[],
}

export interface DashboardPageState {
  dashboardState: DashboardState,
  dataFetchState: FETCH_STATUS,
}
