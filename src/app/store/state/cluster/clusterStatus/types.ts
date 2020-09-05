import { types as t } from "app/backend";

type ApiConstraintColocationPair = t.clusterStatus.ApiConstraintColocationPair;
type ApiConstraintColocationSet = t.clusterStatus.ApiConstraintColocationSet;
type ApiConstraintLocationNode = t.clusterStatus.ApiConstraintLocationNode;
type ApiConstraintLocationRule = t.clusterStatus.ApiConstraintLocationRule;
type ApiConstraintOrderPair = t.clusterStatus.ApiConstraintOrderPair;
type ApiConstraintOrderSet = t.clusterStatus.ApiConstraintOrderSet;
type ApiConstraintResourceSet = t.clusterStatus.ApiConstraintResourceSet;
// prettier-ignore
type ApiConstraintResourceSetStructured = (
  t.clusterStatus.ApiConstraintResourceSetStructured
);
type ApiConstraintTicketResource = t.clusterStatus.ApiConstraintTicketResource;
type ApiConstraintTicketSet = t.clusterStatus.ApiConstraintTicketSet;
type ApiConstraints = t.clusterStatus.ApiConstraints;
type ApiNVPair = t.clusterStatus.ApiNVPair;
type ApiNodeService = t.clusterStatus.ApiNodeService;
type ApiNodeServiceMap = t.clusterStatus.ApiNodeServiceMap;

export type ConstraintLocationNode = ApiConstraintLocationNode;
export type ConstraintLocationRule = ApiConstraintLocationRule;
export type ConstraintColocationPair = ApiConstraintColocationPair;
export type ConstraintColocationSet = ApiConstraintColocationSet;
export type ConstraintOrderPair = ApiConstraintOrderPair;
export type ConstraintOrderSet = ApiConstraintOrderSet;
export type ConstraintResourceSet = ApiConstraintResourceSet;
// prettier-ignore
export type ConstraintResourceSetStructured = (
  ApiConstraintResourceSetStructured
);
export type ConstraintTicketResource = ApiConstraintTicketResource;
export type ConstraintTicketSet = ApiConstraintTicketSet;
export type NVPair = ApiNVPair;
export type Score = t.clusterStatus.ApiScore;

export interface AgentAttribute {
  id: string;
  value: string;
}

export interface Issue {
  severity: "ERROR" | "WARNING";
  message: string;
}

export type NodeStatusFlag = "ONLINE" | "OFFLINE" | "STANDBY";

export type StatusSeverity = "OK" | "ERROR" | "WARNING";

export type NodeService = ApiNodeService;
export type NodeServiceMap = ApiNodeServiceMap;

export type ConnectedNode = {
  name: string;
  status: NodeStatusFlag;
  statusSeverity: StatusSeverity;
  quorum: boolean;
  quorumSeverity: StatusSeverity;
  issueList: Issue[];
  services: ApiNodeServiceMap;
  clusterServices: {
    pacemaker: {
      standby: boolean;
      maintenance: boolean;
    };
  };
};

export type Node = {
  utilization: NVPair[];
  attributes: NVPair[];
} & (
  | ConnectedNode
  | {
      name: string;
      status: "DATA_NOT_PROVIDED";
      issueList: Issue[];
    }
);

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
  metaAttributes: NVPair[];
  issueList: Issue[];
}

export interface Primitive extends ResourceTreeItemBase {
  itemType: "primitive";
  class: string;
  provider: string;
  type: string;
  agentName: string;
  instanceAttributes: Record<string, AgentAttribute>;
  utilization: NVPair[];
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
  agentName: string;
  type: string;
  arguments: Record<string, AgentAttribute>;
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

export type ConstraintPack =
  | { type: "Location"; constraint: ConstraintLocationNode }
  | { type: "Location (rule)"; constraint: ConstraintLocationRule }
  | { type: "Colocation"; constraint: ConstraintColocationPair }
  | { type: "Colocation (set)"; constraint: ConstraintColocationSet }
  | { type: "Order"; constraint: ConstraintOrderPair }
  | { type: "Order (set)"; constraint: ConstraintOrderSet }
  | { type: "Ticket"; constraint: ConstraintTicketResource }
  | { type: "Ticket (set)"; constraint: ConstraintTicketSet };

/*
 status in ApiCLusterStatus is not taken here. There is not real need for it.
*/
export interface ClusterStatus {
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

export interface ClusterStatusService {
  clusterData: ClusterStatus;
  dataFetchState: "NOT_STARTED" | "IN_PROGRESS" | "SUCCESS" | "ERROR";
}
