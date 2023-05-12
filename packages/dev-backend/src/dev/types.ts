import {api} from "app/backend";
import * as call from "app/backend";

export type ImportedClusterList = api.PayloadOf<
  typeof call.importedClusterList
>;
// export type ClusterProperties = api.PayloadOf<typeof call.clusterProperties>;
export type ClusterProperties = api.PayloadOf<
  typeof call.getClusterPropertiesDefinition
>;
export type ClusterPermissions = api.PayloadOf<typeof call.getPermissions>;

export type Cluster = api.PayloadOf<typeof call.clusterStatus>;
export type ResourceAgentListAgents = Extract<
  api.PayloadOf<typeof call.libClusterResourceAgentListAgents>,
  {status: "success"}
>["data"];
export type StonithAgentListAgents = Extract<
  api.PayloadOf<typeof call.libClusterStonithAgentListAgents>,
  {status: "success"}
>["data"];
export type ResourceAgentDescribeAgent = Extract<
  api.PayloadOf<typeof call.libClusterResourceAgentDescribeAgent>,
  {status: "success"}
>["data"];
export type StonithAgentDescribeAgent = Extract<
  api.PayloadOf<typeof call.libClusterStonithAgentDescribeAgent>,
  {status: "success"}
>["data"];

export type Node = Cluster["node_list"][number];
export type NodeServiceMap = Extract<Node, {services: unknown}>["services"];

type Resource = Cluster["resource_list"][number];
type PrimitiveClass = {class_type: "primitive"};
export type Primitive = Extract<Resource, PrimitiveClass & {stonith: false}>;
export type Stonith = Extract<Resource, PrimitiveClass & {stonith: true}>;
export type Clone = Extract<Resource, {class_type: "clone"}>;
export type Group = Extract<Resource, {class_type: "group"}>;
export type CrmStatus = Extract<Resource, PrimitiveClass>["crm_status"][number];
export type Operation = Extract<Resource, PrimitiveClass>["operations"][number];
export type NVPair = Primitive["utilization"][number];
