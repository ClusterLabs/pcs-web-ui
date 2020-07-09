import {
  AgentAttribute as TAgentAttribute,
  Clone as TClone,
  ClusterStatus as TClusterStatus,
  ClusterStatusService as TClusterStatusService,
  ConnectedNode as TConnectedNode,
  ConstraintColocationPair as TConstraintColocationPair,
  ConstraintColocationSet as TConstraintColocationSet,
  ConstraintLocationNode as TConstraintLocationNode,
  ConstraintLocationRule as TConstraintLocationRule,
  ConstraintOrderPair as TConstraintOrderPair,
  ConstraintOrderSet as TConstraintOrderSet,
  ConstraintPack as TConstraintPack,
  ConstraintResourceSet as TConstraintResourceSet,
  ConstraintTicketResource as TConstraintTicketResource,
  ConstraintTicketSet as TConstraintTicketSet,
  FenceDevice as TFenceDevice,
  FenceDeviceStatusFlag as TFenceDeviceStatusFlag,
  Group as TGroup,
  Issue as TIssue,
  NVPair as TNVPair,
  Node as TNode,
  NodeService as TNodeService,
  NodeServiceMap as TNodeServiceMap,
  NodeStatusFlag as TNodeStatusFlag,
  Primitive as TPrimitive,
  ResourceOnNodeStatus as TResourceOnNodeStatus,
  ResourceStatus as TResourceStatus,
  ResourceStatusInfo as TResourceStatusInfo,
  ResourceTreeItem as TResourceTreeItem,
  StatusSeverity as TStatusSeverity,
} from "./clusterStatus";

export type AgentAttribute = TAgentAttribute;
export type Clone = TClone;
export type ClusterStatusService = TClusterStatusService;
export type ClusterStatus = TClusterStatus;
export type ConnectedNode = TConnectedNode;
export type ConstraintColocationPair = TConstraintColocationPair;
export type ConstraintColocationSet = TConstraintColocationSet;
export type ConstraintLocationNode = TConstraintLocationNode;
export type ConstraintLocationRule = TConstraintLocationRule;
export type ConstraintOrderPair = TConstraintOrderPair;
export type ConstraintOrderSet = TConstraintOrderSet;
export type ConstraintPack = TConstraintPack;
export type ConstraintResourceSet = TConstraintResourceSet;
export type ConstraintTicketResource = TConstraintTicketResource;
export type ConstraintTicketSet = TConstraintTicketSet;
export type FenceDeviceStatusFlag = TFenceDeviceStatusFlag;
export type FenceDevice = TFenceDevice;
export type Group = TGroup;
export type Issue = TIssue;
export type NodeServiceMap = TNodeServiceMap;
export type NodeService = TNodeService;
export type NodeStatusFlag = TNodeStatusFlag;
export type Node = TNode;
export type NVPair = TNVPair;
export type Primitive = TPrimitive;
export type ResourceOnNodeStatus = TResourceOnNodeStatus;
export type ResourceStatusInfo = TResourceStatusInfo;
export type ResourceStatus = TResourceStatus;
export type ResourceTreeItem = TResourceTreeItem;
export type StatusSeverity = TStatusSeverity;

export type AppClusterState = {
  clusterStatus: ClusterStatusService;
};

export type ClusterStorage = Record<string, AppClusterState>;
