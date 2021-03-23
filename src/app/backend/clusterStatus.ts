import { TypeOf } from "io-ts";

import { ApiClusterStatus } from "./endpoints/clusterStatus/shape/cluster";
import { ApiNVPair } from "./endpoints/clusterStatus/shape/nvsets";

export type ClusterStatus = TypeOf<typeof ApiClusterStatus>;

export type NVPair = TypeOf<typeof ApiNVPair>;

export type Node = ClusterStatus["node_list"][number];
export type NodeQuorum = Extract<Node, { quorum: unknown }>["quorum"];
export type NodeServiceMap = Extract<Node, { services: unknown }>["services"];

export type Resource = ClusterStatus["resource_list"][number];
type PrimitiveOrStonith = Extract<Resource, { class_type: "primitive" }>;
export type Primitive = Extract<PrimitiveOrStonith, { stonith: false }>;
export type Stonith = Extract<PrimitiveOrStonith, { stonith: true }>;
export type Clone = Extract<Resource, { class_type: "clone" }>;
export type Group = Extract<Resource, { class_type: "group" }>;
