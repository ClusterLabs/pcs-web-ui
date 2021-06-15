import { endpoint } from "./endpoint";

export const removeConstraintRemote = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/remove_constraint_remote`,
  method: "post",
  params: undefined,
  shape: undefined,
});
