/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */

import { ApiClusterStatus } from "./clusterStatusTypes";

export interface ApiClustersOverview {
  cluster_list: ApiClusterStatus[],
}
