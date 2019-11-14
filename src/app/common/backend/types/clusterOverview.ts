/* eslint-disable camelcase */
import * as t from "io-ts";

import { TApiClusterStatus } from "./clusterStatus";

export const TApiClustersOverview = t.type({
  cluster_list: t.array(TApiClusterStatus),
});
export type ApiClustersOverview = t.TypeOf<typeof TApiClustersOverview>;
