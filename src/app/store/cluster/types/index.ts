import {
  ApiConstraintColocation,
  ApiConstraintLocation,
  ApiConstraintOrder,
  ApiConstraintResourceSet,
  ApiConstraintTicket,
  ApiConstraints,
  ApiNodeServiceMap,
  ApiResourceCrmStatus,
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

export type NodeStatusFlag = "ONLINE" | "OFFLINE" | "STANDBY";
export type NodeQuorumFlag = "YES" | "NO";

export type StatusSeverity = "OK" | "ERROR" | "WARNING";

export type Node =
  | {
      name: string;
      status: NodeStatusFlag;
      statusSeverity: StatusSeverity;
      quorum: NodeQuorumFlag;
      quorumSeverity: StatusSeverity;
      issueList: Issue[];
      services: ApiNodeServiceMap;
    }
  | {
      name: string;
      status: "DATA_NOT_PROVIDED";
      issueList: Issue[];
    };

export type FenceDeviceStatusFlag =
  | "RUNNING"
  | "BLOCKED"
  | "FAILED"
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
  crmStatusList: ApiResourceCrmStatus[];
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

export type ResourceOnNodeStatus = {
  resource: {
    id: string;
  };
  node: null | {
    name: string;
  };
  managed: boolean;
  failed: boolean;
  role: string;
  active: boolean;
  orphaned: boolean;
  failureIgnored: boolean;
  nodesRunningOn: number;
  pending: string | null;
  blocked: boolean;
  targetRole?: string;
};

/*
 status in ApiCLusterStatus is not taken here. There is not real need for it.
*/
export interface ClusterState {
  name: string;
  urlName: string;
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
  resourceOnNodeStatusList: ResourceOnNodeStatus[];
}

export interface ClusterServiceState {
  clusterState: ClusterState;
  dataFetchState: "NOT_STARTED" | "IN_PROGRESS" | "SUCCESS" | "ERROR";
}

export type ClusterStorage = Record<string, ClusterServiceState>;
