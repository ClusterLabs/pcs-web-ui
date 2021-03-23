import { api, clusterStatus } from "app/backend";

export type Cluster = api.PayloadOf<typeof clusterStatus>;

// It is more practical to deduce nvpair from one place (so e.g. resource meta
// attributes are skipped).
// 1. The types are the same - typescript infere the type correctly.
// 2. Don't want a formal duty to keep it in sync a new occurences here.
export type NVPair = NonNullable<
  Cluster["node_attr"]
>[keyof Cluster["node_attr"]][number];

export type NodeServiceMap = Extract<
  Cluster["node_list"][number],
  { services: unknown }
>["services"];

type PrimitiveClass = { class_type: "primitive" };
export type Resource = Cluster["resource_list"][number];
export type Primitive = Extract<Resource, PrimitiveClass & { stonith: false }>;
export type Stonith = Extract<Resource, PrimitiveClass & { stonith: true }>;
export type Clone = Extract<Resource, { class_type: "clone" }>;
export type Group = Extract<Resource, { class_type: "group" }>;
export type CrmStatus = Extract<Resource, PrimitiveClass>["crm_status"][number];
export type Operation = Extract<Resource, PrimitiveClass>["operations"][number];

type Constraints = NonNullable<Cluster["constraints"]>;

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
