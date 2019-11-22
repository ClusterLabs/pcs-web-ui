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

export type ApiPrimitive = t.TypeOf<typeof ApiPrimitive>;
export type ApiResource = t.TypeOf<typeof TApiResource>;
export type ApiClone = t.TypeOf<typeof ApiClone>;
export type ApiGroup = t.TypeOf<typeof ApiGroup>;
export type ApiStonith = t.TypeOf<typeof ApiStonith>;
export type ApiIssue = t.TypeOf<typeof ApiIssue>;
export type ApiWithIssues = t.TypeOf<typeof TApiWithIssues>;
export type ApiClusterStatus = t.TypeOf<typeof TApiClusterStatus>;
export type ApiNode = t.TypeOf<typeof ApiNode>;

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
