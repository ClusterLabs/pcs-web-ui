import {endpoint} from "./endpoint";

export const fixAuthOfCluster = endpoint({
  url: ({clusterName}: {clusterName: string}) =>
    `/managec/${clusterName}/fix_auth_of_cluster`,
  method: "post",
  params: undefined,
  payload: undefined,
  validate: undefined,
  shape: undefined,
});
