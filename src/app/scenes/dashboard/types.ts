import { StatusSeverity } from "app/common/types";
import { types as clusterTypes } from "app/services/cluster";

export interface Node {
  name: string,
  status: clusterTypes.NodeStatusFlag,
  statusSeverity: StatusSeverity,
  quorum: clusterTypes.NodeQuorumFlag,
  quorumSeverity: StatusSeverity,
  issueList: clusterTypes.Issue[],
}

export interface ResourceTreeItem {
  id: string,
  itemType: "primitive"|"group"|"clone",
  status: "RUNNING"|"BLOCKED"|"FAILED"|"UNKNOWN",
  statusSeverity: StatusSeverity,
  issueList: clusterTypes.Issue[],
}

export interface FenceDevice {
  id: string,
  status: "RUNNING"|"BLOCKED"|"FAILED"|"UNKNOWN",
  statusSeverity: StatusSeverity,
  issueList: clusterTypes.Issue[],
}

export interface ClusterState {
  name: string,
  urlName: string,
  status: "OK"|"WARNING"|"ERROR"|"UNKNOWN",
  nodeList: Node[],
  resourceTree: ResourceTreeItem[],
  fenceDeviceList: FenceDevice[],
  issueList: clusterTypes.Issue[],
  summary: {
    nodesSeverity: StatusSeverity,
    resourcesSeverity: StatusSeverity,
    fenceDevicesSeverity: StatusSeverity,
    issuesSeverity: StatusSeverity,
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
