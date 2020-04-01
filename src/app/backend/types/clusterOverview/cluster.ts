import * as t from "io-ts";

import {
  TApiClusterStatusFlag as ApiClusterStatusFlag,
  TApiWithIssues as ApiWithIssues,
  TApiResource as ApiResource,
  TApiClusterName as ApiClusterName,
} from "../clusterStatus";

import { ApiNode } from "./nodes";

// It is simplified version of node from cluster status
export const ApiClusterStatus = t.intersection([
  ApiWithIssues,
  t.type({
    cluster_name: ApiClusterName,
    node_list: t.array(ApiNode),
    resource_list: t.array(ApiResource),
    status: ApiClusterStatusFlag,
  }),
]);
