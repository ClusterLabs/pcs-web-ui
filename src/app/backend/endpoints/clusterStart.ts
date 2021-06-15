import { endpoint } from "./endpoint";

export const clusterStart = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/cluster_start`,
  method: "post",
  params: undefined,
  shape: undefined,
});
