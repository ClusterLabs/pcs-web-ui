import { api, http } from "app/backend/tools";

export const clusterStart = async (
  clusterName: string,
  nodeName: string,
): api.CallResult =>
  http.post(`/managec/${clusterName}/cluster_start`, {
    params: [["name", nodeName]],
  });

export const clusterStop = async (
  clusterName: string,
  nodeName: string,
): api.CallResult =>
  http.post(`/managec/${clusterName}/cluster_stop`, {
    params: [["name", nodeName]],
  });
