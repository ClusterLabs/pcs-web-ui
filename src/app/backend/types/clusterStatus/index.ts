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
} from "./nodes";
import {
  ApiConstraintColocation as TApiConstraintColocation,
  ApiConstraintLocation as TApiConstraintLocation,
  ApiConstraintOrder as TApiConstraintOrder,
  ApiConstraintResourceSet as TApiConstraintResourceSet,
  ApiConstraintTicket as TApiConstraintTicket,
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
export type ApiConstraintColocation = t.TypeOf<typeof TApiConstraintColocation>;
export type ApiConstraintLocation = t.TypeOf<typeof TApiConstraintLocation>;
export type ApiConstraintOrder = t.TypeOf<typeof TApiConstraintOrder>;
export type ApiConstraintResourceSet = t.TypeOf<
  typeof TApiConstraintResourceSet
>;
export type ApiConstraints = t.TypeOf<typeof TApiConstraints>;
export type ApiConstraintTicket = t.TypeOf<typeof TApiConstraintTicket>;
export type ApiGroup = t.TypeOf<typeof TApiGroup>;
export type ApiIssue = t.TypeOf<typeof TApiIssue>;
export type ApiNode = t.TypeOf<typeof TApiNode>;
export type ApiNodeQuorum = t.TypeOf<typeof TApiNodeQuorum>;
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
  TApiResource,
  TApiWithIssues,
};
