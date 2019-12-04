/* eslint-disable camelcase */
import * as t from "io-ts";

import {
  ApiScore,
} from "./common";
import { ApiIssue, ApiWithIssues as TApiWithIssues } from "./issues";
import {
  ApiNode,
  ApiNodeStatus as TApiNodeStatus,
  ApiNodeQuorum as TApiNodeQuorum,
  ApiNodeName as TApiNodeName,
} from "./nodes";
import {
  ApiConstraintAction,
  ApiConstraintColocation,
  ApiConstraintLocation,
  ApiConstraintLocationRule,
  ApiConstraintOrder,
  ApiConstraintOrderKind,
  ApiConstraintResourceSet,
  ApiConstraintRole,
  ApiConstraints,
} from "./constraints";
import {
  ApiPrimitive,
  ApiResource as TApiResource,
  ApiClone,
  ApiGroup,
  ApiStonith,
} from "./resources";
import {
  ApiClusterStatus as TApiClusterStatus,
  ApiClusterStatusFlag as TApiClusterStatusFlag,
  ApiClusterName as TApiClusterName,
} from "./cluster";

export type ApiClone = t.TypeOf<typeof ApiClone>;
export type ApiClusterStatus = t.TypeOf<typeof TApiClusterStatus>;
export type ApiConstraintAction = t.TypeOf<typeof ApiConstraintAction>;
export type ApiConstraintColocation = t.TypeOf<typeof ApiConstraintColocation>;
export type ApiConstraintLocationRule = t.TypeOf<
  typeof ApiConstraintLocationRule
>;
export type ApiConstraintLocation = t.TypeOf<typeof ApiConstraintLocation>;
export type ApiConstraintOrderKind = t.TypeOf<typeof ApiConstraintOrderKind>;
export type ApiConstraintOrder = t.TypeOf<typeof ApiConstraintOrder>;
export type ApiConstraintResourceSet = t.TypeOf<
  typeof ApiConstraintResourceSet
>;
export type ApiConstraintRole = t.TypeOf<typeof ApiConstraintRole>;
export type ApiConstraints = t.TypeOf<typeof ApiConstraints>;
export type ApiGroup = t.TypeOf<typeof ApiGroup>;
export type ApiIssue = t.TypeOf<typeof ApiIssue>;
export type ApiNode = t.TypeOf<typeof ApiNode>;
export type ApiPrimitive = t.TypeOf<typeof ApiPrimitive>;
export type ApiResource = t.TypeOf<typeof TApiResource>;
export type ApiScore = t.TypeOf<typeof ApiScore>;
export type ApiStonith = t.TypeOf<typeof ApiStonith>;
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
