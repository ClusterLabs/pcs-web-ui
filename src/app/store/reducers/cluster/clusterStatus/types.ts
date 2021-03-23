import * as apiTypes from "./apiTypes";

export { apiTypes };
type Constraints = NonNullable<apiTypes.Cluster["constraints"]>;

export type NVPair = apiTypes.NVPair;
export type NodeServiceMap = apiTypes.NodeServiceMap;

export type ConstraintLocationNode = apiTypes.ConstraintLocationNode;
export type ConstraintLocationRule = apiTypes.ConstraintLocationRule;
export type ConstraintColocationPair = apiTypes.ConstraintColocationPair;
export type ConstraintColocationSet = apiTypes.ConstraintColocationSet;
export type ConstraintOrderPair = apiTypes.ConstraintOrderPair;
export type ConstraintOrderSet = apiTypes.ConstraintOrderSet;
export type ConstraintTicketResource = apiTypes.ConstraintTicketResource;
export type ConstraintTicketSet = apiTypes.ConstraintTicketSet;
export type ConstraintResourceSet = apiTypes.ConstraintResourceSet;

export interface AgentAttribute {
  id: string;
  value: string;
}

type IssueSeverity = "ERROR" | "WARNING";

type IssueCommon = {
  severity: IssueSeverity;
  message: string;
};

export type IssueNotAuth = IssueCommon & {
  type: "nodes_not_authorized";
  nodeList: string[];
};

export type Issue = IssueCommon | IssueNotAuth;

export type NodeStatusFlag = "ONLINE" | "OFFLINE" | "STANDBY";

export type StatusSeverity = "OK" | "ERROR" | "WARNING";

export type ConnectedNode = {
  name: string;
  status: NodeStatusFlag;
  statusSeverity: StatusSeverity;
  quorum: boolean;
  quorumSeverity: StatusSeverity;
  issueList: Issue[];
  services: NodeServiceMap;
};

export type Node = {
  // following information are gained from cluster status; we have them even if
  // the node is not reachable
  inMaintenance: boolean;
  inStandby: boolean;
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
  nodeList: Node[];
  resourceTree: ResourceTreeItem[];
  fenceDeviceList: FenceDevice[];
  constraints?: Constraints;
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
