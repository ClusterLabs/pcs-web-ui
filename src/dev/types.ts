import { api } from "app/backend";
import * as call from "app/backend";

export type ImportedClusterList = api.PayloadOf<
  typeof call.importedClusterList
>;
export type FenceAgentMetadata = api.PayloadOf<
  typeof call.getFenceAgentMetadata
>;
export type ClusterProperties = api.PayloadOf<typeof call.clusterProperties>;
export type Cluster = api.PayloadOf<typeof call.clusterStatus>;
export type ResourceAgentListAgents = api.PayloadOf<
  typeof call.libClusterResourceAgentListAgents
>["data"];
export type ResourceAgentDescribeAgent = api.PayloadOf<
  typeof call.libClusterResourceAgentDescribeAgent
>["data"];

export type Node = Cluster["node_list"][number];
export type NodeServiceMap = Extract<Node, { services: unknown }>["services"];

type Resource = Cluster["resource_list"][number];
type PrimitiveClass = { class_type: "primitive" };
export type Primitive = Extract<Resource, PrimitiveClass & { stonith: false }>;
export type Stonith = Extract<Resource, PrimitiveClass & { stonith: true }>;
export type Clone = Extract<Resource, { class_type: "clone" }>;
export type Group = Extract<Resource, { class_type: "group" }>;
export type CrmStatus = Extract<Resource, PrimitiveClass>["crm_status"][number];
export type Operation = Extract<Resource, PrimitiveClass>["operations"][number];
