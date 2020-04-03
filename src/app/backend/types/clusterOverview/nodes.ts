import * as t from "io-ts";

import {
  TApiNodeName as ApiNodeName,
  TApiNodeQuorum as ApiNodeQuorum,
  TApiNodeStatus as ApiNodeStatus,
  TApiWithIssues as ApiWithIssues,
} from "../clusterStatus";

// It is simplified version of node from cluster status
export const ApiNode = t.intersection([
  ApiWithIssues,
  t.type({
    name: ApiNodeName,
    status: ApiNodeStatus,
  }),
  t.partial({
    quorum: ApiNodeQuorum,
  }),
]);
