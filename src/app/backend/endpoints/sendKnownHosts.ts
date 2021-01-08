import { endpoint } from "./endpoint";

export const sendKnownHosts = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/send-known-hosts`,
  method: "post",
  shape: undefined,
});
