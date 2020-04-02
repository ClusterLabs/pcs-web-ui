import * as t from "io-ts";

import {
  TApiClusterName as ApiClusterName,
  TApiClusterStatusFlag as ApiClusterStatusFlag,
  TApiResource as ApiResource,
  TApiWithIssues as ApiWithIssues,
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
