import * as t from "io-ts";

import {
  ApiIssue as TApiIssue,
  ApiWithIssues as TApiWithIssues,
} from "./issues";
import {
  ApiNode as TApiNode,
  ApiNodeName as TApiNodeName,
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
  ApiResourceCrmStatus as TApiResourceCrmStatus,
  ApiStonith as TApiStonith,
} from "./resources";
import {
  ApiClusterName as TApiClusterName,
  ApiClusterStatus as TApiClusterStatus,
  ApiClusterStatusFlag as TApiClusterStatusFlag,
} from "./cluster";

export type ApiClone = t.TypeOf<typeof TApiClone>;
export type ApiClusterStatus = t.TypeOf<typeof TApiClusterStatus>;
export type ApiConstraintColocationPair = t.TypeOf<
  typeof TApiConstraintColocationPair
>;
export type ApiConstraintColocationSet = t.TypeOf<
  typeof TApiConstraintColocationSet
>;
export type ApiConstraintLocationNode = t.TypeOf<
  typeof TApiConstraintLocationNode
>;
export type ApiConstraintLocationRule = t.TypeOf<
  typeof TApiConstraintLocationRule
>;
export type ApiConstraintOrderPair = t.TypeOf<typeof TApiConstraintOrderPair>;
export type ApiConstraintOrderSet = t.TypeOf<typeof TApiConstraintOrderSet>;
export type ApiConstraintResourceSet = t.TypeOf<
  typeof TApiConstraintResourceSet
>;
export type ApiConstraints = t.TypeOf<typeof TApiConstraints>;
export type ApiConstraintTicketResource = t.TypeOf<
  typeof TApiConstraintTicketResource
>;
export type ApiConstraintTicketSet = t.TypeOf<typeof TApiConstraintTicketSet>;
export type ApiGroup = t.TypeOf<typeof TApiGroup>;
export type ApiIssue = t.TypeOf<typeof TApiIssue>;
export type ApiNode = t.TypeOf<typeof TApiNode>;
export type ApiNodeQuorum = t.TypeOf<typeof TApiNodeQuorum>;
export type ApiNodeServiceMap = t.TypeOf<typeof TApiNodeServiceMap>;
export type ApiNodeService = t.TypeOf<typeof TApiNodeService>;
export type ApiNodeStatus = t.TypeOf<typeof TApiNodeStatus>;
export type ApiResourceBase = t.TypeOf<typeof TApiResourceBase>;
export type ApiPrimitive = t.TypeOf<typeof TApiPrimitive>;
export type ApiResource = t.TypeOf<typeof TApiResource>;
export type ApiStonith = t.TypeOf<typeof TApiStonith>;
export type ApiResourceCrmStatus = t.TypeOf<typeof TApiResourceCrmStatus>;
export type ApiWithIssues = t.TypeOf<typeof TApiWithIssues>;

export {
  TApiClusterName,
  TApiClusterStatus,
  TApiClusterStatusFlag,
  TApiNodeName,
  TApiNodeQuorum,
  TApiNodeService,
  TApiNodeServiceMap,
  TApiResource,
  TApiWithIssues,
};
