import { api } from "app/backend";

/* eslint-disable max-len */

type ApiConstraintColocationPair = api.types.clusterStatus.ApiConstraintColocationPair;
type ApiConstraintColocationSet = api.types.clusterStatus.ApiConstraintColocationSet;
type ApiConstraintLocationNode = api.types.clusterStatus.ApiConstraintLocationNode;
type ApiConstraintLocationRule = api.types.clusterStatus.ApiConstraintLocationRule;
type ApiConstraintOrderPair = api.types.clusterStatus.ApiConstraintOrderPair;
type ApiConstraintOrderSet = api.types.clusterStatus.ApiConstraintOrderSet;
type ApiConstraintResourceSet = api.types.clusterStatus.ApiConstraintResourceSet;
// prettier-ignore
type ApiConstraintResourceSetStructured = (
  api.types.clusterStatus.ApiConstraintResourceSetStructured
);
type ApiConstraintTicketResource = api.types.clusterStatus.ApiConstraintTicketResource;
type ApiConstraintTicketSet = api.types.clusterStatus.ApiConstraintTicketSet;
type ApiConstraints = api.types.clusterStatus.ApiConstraints;
type ApiNVPair = api.types.clusterStatus.ApiNVPair;
type ApiNodeService = api.types.clusterStatus.ApiNodeService;
type ApiNodeServiceMap = api.types.clusterStatus.ApiNodeServiceMap;

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
export type Score = api.types.clusterStatus.ApiScore;

export interface AgentAttribute {
  id: string;
  value: string;
}

type IssueSeverity = "ERROR" | "WARNING";
export type Issue =
  | {
      severity: IssueSeverity;
      message: string;
    }
  | {
      severity: IssueSeverity;
      message: string;
      type: "nodes_not_authorized";
      nodeList: string[];
    };

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
};

export type Node =
  | ConnectedNode
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
  metaAttributes: NVPair[];
  issueList: Issue[];
}

export interface Primitive extends ResourceTreeItemBase {
  itemType: "primitive";
  inClone: boolean;
  inGroup: boolean;
  class: string;
  provider: string;
  type: string;
  agentName: string;
  instanceAttributes: Record<string, AgentAttribute>;
  utilization: NVPair[];
}

export interface Group extends ResourceTreeItemBase {
  itemType: "group";
  inClone: boolean;
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
  nodeAttr: Record<string, NVPair[]>;
  nodesUtilization: Record<string, NVPair[]>;
  sbdDetection: null | {
    enabled: boolean;
  };
}

export interface ClusterStatusService {
  clusterData: ClusterStatus;
  dataFetchState: "NOT_STARTED" | "IN_PROGRESS" | "SUCCESS";
}
