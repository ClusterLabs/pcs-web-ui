import { TApiClusterStatus as shape } from "../types/clusterStatus";

import { endpoint } from "./endpoint";

export const clusterStatus = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/cluster_status`,
  method: "get",
  shape,
});
