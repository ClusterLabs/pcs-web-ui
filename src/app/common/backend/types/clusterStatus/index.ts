/* eslint-disable camelcase */
import * as t from "io-ts";

import { ApiIssue, ApiWithIssues as TApiWithIssues } from "./issues";
import {
  ApiNode,
  ApiNodeStatus as TApiNodeStatus,
  ApiNodeQuorum as TApiNodeQuorum,
  ApiNodeName as TApiNodeName,
} from "./nodes";
import {
  ApiConstraintColocation,
  ApiConstraintLocation,
  ApiConstraintOrder,
  ApiConstraintResourceSet,
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
export type ApiConstraintColocation = t.TypeOf<typeof ApiConstraintColocation>;
export type ApiConstraintLocation = t.TypeOf<typeof ApiConstraintLocation>;
export type ApiConstraintOrder = t.TypeOf<typeof ApiConstraintOrder>;
export type ApiConstraintResourceSet = t.TypeOf<
  typeof ApiConstraintResourceSet
>;
export type ApiConstraints = t.TypeOf<typeof ApiConstraints>;
export type ApiGroup = t.TypeOf<typeof ApiGroup>;
export type ApiIssue = t.TypeOf<typeof ApiIssue>;
export type ApiNode = t.TypeOf<typeof ApiNode>;
export type ApiPrimitive = t.TypeOf<typeof ApiPrimitive>;
export type ApiResource = t.TypeOf<typeof TApiResource>;
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
