import { api, http } from "app/backend/tools";

export const fixAuthOfCluster = async (clusterName: string): api.CallResult => {
  return http.post(`/managec/${clusterName}/fix_auth_of_cluster`);
};
