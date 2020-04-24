import {
  ApiConstraintColocation,
  ApiConstraintLocation,
  ApiConstraintOrder,
  ApiConstraintResourceSet,
  ApiConstraintTicket,
  ApiConstraints,
} from "app/backend/types/clusterStatus";

export type ConstraintLocation = ApiConstraintLocation;
export type ConstraintColocation = ApiConstraintColocation;
export type ConstraintOrder = ApiConstraintOrder;
export type ConstraintResourceSet = ApiConstraintResourceSet;
export type ConstraintTicket = ApiConstraintTicket;

interface InstanceAttribute {
  id: string;
  value: string;
}

export interface Issue {
  severity: "ERROR" | "WARNING";
  message: string;
}

export type NodeStatusFlag = "ONLINE" | "OFFLINE" | "UNKNOWN";
export type NodeQuorumFlag = "YES" | "NO" | "UNKNOWN";

export type StatusSeverity = "OK" | "ERROR" | "WARNING" | "UNKNOWN";

export interface Node {
  name: string;
  status: NodeStatusFlag;
  statusSeverity: StatusSeverity;
  quorum: NodeQuorumFlag;
  quorumSeverity: StatusSeverity;
  issueList: Issue[];
}

export type FenceDeviceStatusFlag =
  | "RUNNING"
  | "BLOCKED"
  | "FAILED"
  | "UNKNOWN"
  | "DISABLED";

export type ResourceStatusInfo = {
  label: string;
  severity: StatusSeverity;
};

export type ResourceStatus = {
  maxSeverity: StatusSeverity;
  infoList: ResourceStatusInfo[];
};

interface ResourceTreeItemBase {
  id: string;
  itemType: string;
  status: ResourceStatus;
  issueList: Issue[];
}

export interface Primitive extends ResourceTreeItemBase {
  itemType: "primitive";
  class: string;
  provider: string;
  type: string;
  agentName: string;
  instanceAttributes: Record<string, InstanceAttribute>;
}

export interface Group extends ResourceTreeItemBase {
  itemType: "group";
  resources: Primitive[];
}

export interface Clone extends ResourceTreeItemBase {
  itemType: "clone";
  member: Primitive | Group;
}

export type ResourceTreeItem = Primitive | Group | Clone;

export interface FenceDevice {
  id: string;
  status: FenceDeviceStatusFlag;
  statusSeverity: StatusSeverity;
  issueList: Issue[];
  type: string;
}

export interface ClusterState {
  name: string;
  urlName: string;
  status: "OK" | "WARNING" | "ERROR" | "UNKNOWN";
  statusSeverity: StatusSeverity;
  nodeList: Node[];
  resourceTree: ResourceTreeItem[];
  fenceDeviceList: FenceDevice[];
  constraints?: ApiConstraints;
  issueList: Issue[];
  summary: {
    nodesSeverity: StatusSeverity;
    resourcesSeverity: StatusSeverity;
    fenceDevicesSeverity: StatusSeverity;
    issuesSeverity: StatusSeverity;
  };
}

export interface ClusterServiceState {
  clusterState: ClusterState;
  dataFetchState: "NOT_STARTED" | "IN_PROGRESS" | "SUCCESS" | "ERROR";
}

export type ClusterStorage = Record<string, ClusterServiceState>;
