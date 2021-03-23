import { CallResult, endpoints, http } from "app/backend/tools";

const { url } = endpoints.fixAuthOfCluster;

export const fixAuthOfCluster = async (clusterName: string): CallResult => {
  return http.post(url({ clusterName }));
};
