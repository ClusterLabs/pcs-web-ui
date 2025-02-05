import {endpoints} from "app/backend/endpoints";

import type * as types from "dev/types";

export const clusterStatus = ({
  clusterStatus,
}: {
  clusterStatus: types.Cluster;
}) => ({
  url: endpoints.clusterStatus.url({clusterName: clusterStatus.cluster_name}),
  json: clusterStatus,
});
