import { api, http } from "app/backend/tools";

export const clusterStart = async (
  clusterUrlName: string,
  nodeName: string,
): api.CallResult =>
  http.post(`/managec/${clusterUrlName}/cluster_start`, {
    params: [["name", nodeName]],
  });

export const clusterStop = async (
  clusterUrlName: string,
  nodeName: string,
): api.CallResult =>
  http.post(`/managec/${clusterUrlName}/cluster_stop`, {
    params: [["name", nodeName]],
  });
