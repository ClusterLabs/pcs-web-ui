import * as t from "io-ts";

import {
  ApiIssue as TApiIssue,
  ApiWithIssues as TApiWithIssues,
} from "./issues";
import {
  ApiNode as TApiNode,
  ApiNodeStatus as TApiNodeStatus,
  ApiNodeQuorum as TApiNodeQuorum,
  ApiNodeName as TApiNodeName,
} from "./nodes";
import {
  ApiConstraintColocation as TApiConstraintColocation,
  ApiConstraintLocation as TApiConstraintLocation,
  ApiConstraintOrder as TApiConstraintOrder,
  ApiConstraintTicket as TApiConstraintTicket,
  ApiConstraintResourceSet as TApiConstraintResourceSet,
  ApiConstraints as TApiConstraints,
} from "./constraints";
import {
  ApiPrimitive as TApiPrimitive,
  ApiResource as TApiResource,
  ApiClone as TApiClone,
  ApiGroup as TApiGroup,
  ApiStonith as TApiStonith,
  ApiResourceBase as TApiResourceBase,
} from "./resources";
import {
  ApiClusterStatus as TApiClusterStatus,
  ApiClusterStatusFlag as TApiClusterStatusFlag,
  ApiClusterName as TApiClusterName,
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
export type ApiResourceBase = t.TypeOf<typeof TApiResourceBase>;
export type ApiPrimitive = t.TypeOf<typeof TApiPrimitive>;
export type ApiResource = t.TypeOf<typeof TApiResource>;
export type ApiStonith = t.TypeOf<typeof TApiStonith>;
export type ApiWithIssues = t.TypeOf<typeof TApiWithIssues>;

export {
  TApiClusterName,
  TApiClusterStatus,
  TApiClusterStatusFlag,
  TApiNodeName,
  TApiNodeQuorum,
  TApiNodeStatus,
  TApiResource,
  TApiWithIssues,
};
