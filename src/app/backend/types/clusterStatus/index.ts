import { TypeOf } from "io-ts";
import {
  ApiIssue as TApiIssue,
  ApiWithIssues as TApiWithIssues,
} from "./issues";
import {
  ApiNode as TApiNode,
  ApiNodeQuorum as TApiNodeQuorum,
  ApiNodeService as TApiNodeService,
  ApiNodeServiceMap as TApiNodeServiceMap,
  ApiNodeStatus as TApiNodeStatus,
} from "./nodes";
import {
  ApiConstraintColocationPair as TApiConstraintColocationPair,
  ApiConstraintColocationSet as TApiConstraintColocationSet,
  ApiConstraintLocationNode as TApiConstraintLocationNode,
  ApiConstraintLocationRule as TApiConstraintLocationRule,
  ApiConstraintOrderPair as TApiConstraintOrderPair,
  ApiConstraintOrderSet as TApiConstraintOrderSet,
  ApiConstraintResourceSet as TApiConstraintResourceSet,
  ApiConstraintTicketResource as TApiConstraintTicketResource,
  ApiConstraintTicketSet as TApiConstraintTicketSet,
  ApiConstraints as TApiConstraints,
} from "./constraints";
import {
  ApiClone as TApiClone,
  ApiGroup as TApiGroup,
  ApiPrimitive as TApiPrimitive,
  ApiResource as TApiResource,
  ApiResourceBase as TApiResourceBase,
  ApiStonith as TApiStonith,
} from "./resources";
import { ApiClusterStatus as TApiClusterStatus } from "./cluster";
import { ApiNVPair as TApiNVPair } from "./nvsets";

export type ApiClone = TypeOf<typeof TApiClone>;
export type ApiClusterStatus = TypeOf<typeof TApiClusterStatus>;
export type ApiConstraintColocationPair = TypeOf<
  typeof TApiConstraintColocationPair
>;
export type ApiConstraintColocationSet = TypeOf<
  typeof TApiConstraintColocationSet
>;
export type ApiConstraintLocationNode = TypeOf<
  typeof TApiConstraintLocationNode
>;
export type ApiConstraintLocationRule = TypeOf<
  typeof TApiConstraintLocationRule
>;
export type ApiConstraintOrderPair = TypeOf<typeof TApiConstraintOrderPair>;
export type ApiConstraintOrderSet = TypeOf<typeof TApiConstraintOrderSet>;
export type ApiConstraintResourceSet = TypeOf<typeof TApiConstraintResourceSet>;
export type ApiConstraints = TypeOf<typeof TApiConstraints>;
export type ApiConstraintTicketResource = TypeOf<
  typeof TApiConstraintTicketResource
>;
export type ApiConstraintTicketSet = TypeOf<typeof TApiConstraintTicketSet>;
export type ApiGroup = TypeOf<typeof TApiGroup>;
export type ApiIssue = TypeOf<typeof TApiIssue>;
export type ApiNode = TypeOf<typeof TApiNode>;
export type ApiNodeQuorum = TypeOf<typeof TApiNodeQuorum>;
export type ApiNodeServiceMap = TypeOf<typeof TApiNodeServiceMap>;
export type ApiNodeService = TypeOf<typeof TApiNodeService>;
export type ApiNodeStatus = TypeOf<typeof TApiNodeStatus>;
export type ApiResourceBase = TypeOf<typeof TApiResourceBase>;
export type ApiPrimitive = TypeOf<typeof TApiPrimitive>;
export type ApiResource = TypeOf<typeof TApiResource>;
export type ApiStonith = TypeOf<typeof TApiStonith>;
export type ApiWithIssues = TypeOf<typeof TApiWithIssues>;
export type ApiNVPair = TypeOf<typeof TApiNVPair>;

export { TApiClusterStatus };
