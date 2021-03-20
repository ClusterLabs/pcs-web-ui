import { api } from "app/backend";

/* eslint-disable max-len */

type Constraints = NonNullable<api.clusterStatus.ClusterStatus["constraints"]>;

type Location = NonNullable<Constraints["rsc_location"]>[number];
export type ConstraintLocationNode = Extract<Location, { node: string }>;
export type ConstraintLocationRule = Extract<Location, { rule_string: string }>;

type Colocation = NonNullable<Constraints["rsc_colocation"]>[number];
export type ConstraintColocationPair = Extract<Colocation, { rsc: string }>;
export type ConstraintColocationSet = Extract<Colocation, { sets: unknown }>;

type Order = NonNullable<Constraints["rsc_order"]>[number];
export type ConstraintOrderPair = Extract<Order, { first: string }>;
export type ConstraintOrderSet = Extract<Order, { sets: unknown }>;

type Ticket = NonNullable<Constraints["rsc_ticket"]>[number];
export type ConstraintTicketResource = Extract<Ticket, { rsc: string }>;
export type ConstraintTicketSet = Extract<Ticket, { sets: unknown }>;

export type ConstraintResourceSet = (
  | ConstraintColocationSet
  | ConstraintOrderSet
  | ConstraintTicketSet
)["sets"][number];
export type ConstraintResourceSetStructured = Extract<
  ConstraintResourceSet,
  { id: string }
>;

export type NVPair = api.clusterStatus.NVPair;

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

export type NodeServiceMap = api.clusterStatus.NodeServiceMap;

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
