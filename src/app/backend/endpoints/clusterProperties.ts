import * as types from "app/backend/types";

import { endpoint } from "./endpoint";

export const clusterProperties = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/cluster_properties`,
  method: "get",
  shape: types.clusterProperties.TApiClusterProperties,
});
