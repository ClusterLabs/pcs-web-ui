/* eslint-disable camelcase */
import * as t from "io-ts";

import {
  TApiNodeStatus as ApiNodeStatus,
  TApiNodeQuorum as ApiNodeQuorum,
  TApiNodeName as ApiNodeName,
  TApiWithIssues as ApiWithIssues,
} from "app/backend/types/clusterStatus";

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
