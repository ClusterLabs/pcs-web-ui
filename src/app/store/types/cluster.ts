import {
  ApiConstraintColocationPair,
  ApiConstraintColocationSet,
  ApiConstraintLocationNode,
  ApiConstraintLocationRule,
  ApiConstraintOrderPair,
  ApiConstraintOrderSet,
  ApiConstraintResourceSet,
  ApiConstraintTicketResource,
  ApiConstraintTicketSet,
  ApiConstraints,
  ApiNVPair,
  ApiNodeService,
  ApiNodeServiceMap,
} from "app/backend/types/clusterStatus";

export type ConstraintLocationNode = ApiConstraintLocationNode;
export type ConstraintLocationRule = ApiConstraintLocationRule;
export type ConstraintColocationPair = ApiConstraintColocationPair;
export type ConstraintColocationSet = ApiConstraintColocationSet;
export type ConstraintOrderPair = ApiConstraintOrderPair;
export type ConstraintOrderSet = ApiConstraintOrderSet;
export type ConstraintResourceSet = ApiConstraintResourceSet;
export type ConstraintTicketResource = ApiConstraintTicketResource;
export type ConstraintTicketSet = ApiConstraintTicketSet;
export type NVPair = ApiNVPair;

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

export type ConstraintPack =
  | { type: "LOCATION_NODE"; constraint: ConstraintLocationNode }
  | { type: "LOCATION_RULE"; constraint: ConstraintLocationRule }
  | { type: "COLOCATION_PAIR"; constraint: ConstraintColocationPair }
  | { type: "COLOCATION_SET"; constraint: ConstraintColocationSet }
  | { type: "ORDER_PAIR"; constraint: ConstraintOrderPair }
  | { type: "ORDER_SET"; constraint: ConstraintOrderSet }
  | { type: "TICKET_RESOURCE"; constraint: ConstraintTicketResource }
  | { type: "TICKET_SET"; constraint: ConstraintTicketSet };

export type ClusterStorage = Record<string, ClusterServiceState>;
