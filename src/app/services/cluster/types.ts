import { StatusSeverity } from "app/common/types";

export interface NVPair {
  id: string,
  name: string,
  value: string,
}

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

export interface Primitive extends ResourceTreeItemBase {
  itemType: "primitive",
  class: string,
  provider: string,
  type: string,
  agentName: string;
  instanceAttributes: NVPair[],
}

export interface Group extends ResourceTreeItemBase {
  itemType: "group",
  resources: Primitive[],
}

export interface Clone extends ResourceTreeItemBase {
  itemType: "clone",
  member: Primitive|Group;
}

export type ResourceTreeItem = Primitive|Group|Clone;

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
    issuesSeverity: StatusSeverity,
  },
}

export type FETCH_STATUS = "NOT_STARTED"|"IN_PROGRESS"|"SUCCESS"|"ERROR";

export interface ClusterServiceState {
  clusterState: ClusterState,
  dataFetchState: FETCH_STATUS,
}
