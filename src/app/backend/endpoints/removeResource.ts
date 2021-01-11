import { endpoint } from "./endpoint";

export const removeResource = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/remove_resource`,
  method: "post",
  shape: undefined,
});
