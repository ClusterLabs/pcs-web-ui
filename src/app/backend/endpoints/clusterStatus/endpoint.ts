import { endpoint } from "../endpoint";

import { ApiClusterStatus as shape } from "./shape/cluster";

export const clusterStatus = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/cluster_status`,
  method: "get",
  params: undefined,
  payload: undefined,
  validate: undefined,
  shape,
});
