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

export type Node = api.types.clusterStatus.ApiNode;
export type Primitive = api.types.clusterStatus.ApiPrimitive;
export type Stonith = api.types.clusterStatus.ApiStonith;
export type Clone = api.types.clusterStatus.ApiClone;
export type Group = api.types.clusterStatus.ApiGroup;
export type CrmStatus = api.types.clusterStatus.ApiResourceCrmStatus;
export type Cluster = api.types.clusterStatus.ApiClusterStatus;
export type Operation = api.types.clusterStatus.ApiResourceOperation;
