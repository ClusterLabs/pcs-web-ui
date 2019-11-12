/* eslint-disable camelcase */
import * as t from "io-ts";

import { TApiIssue, TApiWithIssues } from "./issues";
import { TApiNode } from "./nodes";
import {
  TApiPrimitive,
  TApiResource,
  TApiClone,
  TApiGroup,
  TApiStonith,
} from "./resources";
import { TApiClusterStatus } from "./cluster";

export type ApiPrimitive = t.TypeOf<typeof TApiPrimitive>;
export type ApiResource = t.TypeOf<typeof TApiResource>;
export type ApiClone = t.TypeOf<typeof TApiClone>;
export type ApiGroup = t.TypeOf<typeof TApiGroup>;
export type ApiStonith = t.TypeOf<typeof TApiStonith>;
export type ApiIssue = t.TypeOf<typeof TApiIssue>;
export type ApiWithIssues = t.TypeOf<typeof TApiWithIssues>;
export type ApiClusterStatus = t.TypeOf<typeof TApiClusterStatus>;
export type ApiNode = t.TypeOf<typeof TApiNode>;
