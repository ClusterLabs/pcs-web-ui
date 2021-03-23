import { PayloadOf } from "./call";
import { clusterStatus } from "./calls";

export type ClusterStatus = PayloadOf<typeof clusterStatus>;

export type Node = ClusterStatus["node_list"][number];
export type NodeQuorum = Extract<Node, { quorum: unknown }>["quorum"];
export type NodeServiceMap = Extract<Node, { services: unknown }>["services"];

export type Resource = ClusterStatus["resource_list"][number];
type PrimitiveOrStonith = Extract<Resource, { class_type: "primitive" }>;
export type Primitive = Extract<PrimitiveOrStonith, { stonith: false }>;
export type Stonith = Extract<PrimitiveOrStonith, { stonith: true }>;
export type Clone = Extract<Resource, { class_type: "clone" }>;
export type Group = Extract<Resource, { class_type: "group" }>;

// It is more practical to deduce nvpair from one place (so e.g. resource meta
// attributes are skipped).
// 1. The types are the same - typescript infere the type correctly.
// 2. Don't want a formal duty to keep it in sync a new occurences here
export type NVPair = NonNullable<
  ClusterStatus["node_attr"]
>[keyof ClusterStatus["node_attr"]][number];
