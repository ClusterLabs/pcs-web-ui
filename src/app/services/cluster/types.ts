import { StatusSeverity } from "app/common/types";

export interface Issue {
  severity: "ERROR"|"WARNING",
  message: string,
}

export interface Node {
  name: string,
  status: "ONLINE"|"OFFLINE"|"UNKNOWN",
  statusSeverity: StatusSeverity,
  quorum: "YES"|"NO"|"UNKNOWN",
  quorumSeverity: StatusSeverity,
  issueList: Issue[],
}

export interface ResourceTreeItemBase {
  id: string,
  itemType: string,
  status: "RUNNING"|"BLOCKED"|"FAILED"|"UNKNOWN",
  statusSeverity: StatusSeverity,
  issueList: Issue[],
}

export interface Resource extends ResourceTreeItemBase {
  itemType: "resource",
}

export interface Group extends ResourceTreeItemBase {
  itemType: "group",
  resources: Resource[],
}

export interface Clone extends ResourceTreeItemBase {
  itemType: "clone",
  member: Resource|Group;
}

export type ResourceTreeItem = Resource|Group|Clone;

export interface FenceDevice {
  id: string,
  status: "RUNNING"|"BLOCKED"|"FAILED"|"UNKNOWN",
  statusSeverity: StatusSeverity,
  issueList: Issue[],
}

export interface ClusterState {
  name: string,
  urlName: string,
  status: "OK"|"WARNING"|"ERROR"|"UNKNOWN",
  nodeList: Node[],
  resourceTree: ResourceTreeItem[],
  fenceDeviceList: FenceDevice[],
  issueList: Issue[],
  summary: {
    nodesSeverity: StatusSeverity,
    resourcesSeverity: StatusSeverity,
    fenceDevicesSeverity: StatusSeverity,
    issusSeverity: StatusSeverity,
  },
}

export type FETCH_STATUS = "NOT_STARTED"|"IN_PROGRESS"|"SUCCESS"|"ERROR";

export interface ClusterServiceState {
  clusterState: ClusterState,
  dataFetchState: FETCH_STATUS,
}
