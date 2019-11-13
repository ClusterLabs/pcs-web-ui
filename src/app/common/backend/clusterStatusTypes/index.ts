/* eslint-disable camelcase */
import * as t from "io-ts";

import { ApiIssue, ApiWithIssues } from "./issues";
import { ApiNode } from "./nodes";
import {
  ApiPrimitive,
  ApiResource,
  ApiClone,
  ApiGroup,
  ApiStonith,
} from "./resources";
import { ApiClusterStatus as TApiClusterStatus } from "./cluster";

export type ApiPrimitive = t.TypeOf<typeof ApiPrimitive>;
export type ApiResource = t.TypeOf<typeof ApiResource>;
export type ApiClone = t.TypeOf<typeof ApiClone>;
export type ApiGroup = t.TypeOf<typeof ApiGroup>;
export type ApiStonith = t.TypeOf<typeof ApiStonith>;
export type ApiIssue = t.TypeOf<typeof ApiIssue>;
export type ApiWithIssues = t.TypeOf<typeof ApiWithIssues>;
export type ApiClusterStatus = t.TypeOf<typeof TApiClusterStatus>;
export type ApiNode = t.TypeOf<typeof ApiNode>;

export {
  TApiClusterStatus,
};
