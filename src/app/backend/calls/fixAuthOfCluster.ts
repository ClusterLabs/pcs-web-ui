import { api, http } from "app/backend/tools";

export const fixAuthOfCluster = async (
  clusterUrlName: string,
): api.CallResult => {
  return http.post(`/managec/${clusterUrlName}/fix_auth_of_cluster`);
};
