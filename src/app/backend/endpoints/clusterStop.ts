import { endpoint } from "./endpoint";

export const clusterStop = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/cluster_stop`,
  method: "post",
  params: undefined,
  payload: undefined,
  shape: undefined,
});
