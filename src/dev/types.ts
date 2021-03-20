import { api } from "app/backend";
import * as call from "app/backend";

export type ImportedClusterList = api.PayloadOf<
  typeof call.importedClusterList
>;
export type AvailResourceAgents = api.PayloadOf<
  typeof call.getAvailResourceAgents
>;
export type ResourceAgentMetadata = api.PayloadOf<
  typeof call.getResourceAgentMetadata
>;
export type FenceAgentMetadata = api.PayloadOf<
  typeof call.getFenceAgentMetadata
>;
export type ClusterProperties = api.PayloadOf<typeof call.clusterProperties>;
export type ClusterStatus = api.PayloadOf<typeof call.clusterStatus>;

type PrimitiveOrStonith = Extract<
  api.clusterStatus.Resource,
  { class_type: "primitive" }
>;

export type Cluster = api.clusterStatus.ClusterStatus;
export type Node = Cluster["node_list"][number];
export type NodeServiceMap = api.clusterStatus.NodeServiceMap;
export type Primitive = api.clusterStatus.Primitive;
export type Stonith = api.clusterStatus.Stonith;
export type Clone = api.clusterStatus.Clone;
export type Group = api.clusterStatus.Group;
export type CrmStatus = PrimitiveOrStonith["crm_status"][number];
export type Operation = PrimitiveOrStonith["operations"][number];
