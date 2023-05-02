import {endpoint} from "./endpoint";

export const destroyCluster = endpoint({
  url: ({clusterName}: {clusterName: string}) =>
    `/managec/${clusterName}/cluster_destroy`,
  method: "post",
  params: undefined,
  validate: undefined,
  shape: undefined,
  payload: undefined,
});
