import { endpoint } from "./endpoint";

export const resourceClone = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/resource_clone`,
  method: "post",
  params: undefined,
  payload: undefined,
  validate: undefined,
  shape: undefined,
});
