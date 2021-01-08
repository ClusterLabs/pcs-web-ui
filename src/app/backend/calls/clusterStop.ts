import { api, endpoints, http } from "app/backend/tools";

const { url } = endpoints.clusterStop;

export const clusterStop = async (
  clusterName: string,
  nodeName: string,
): api.CallResult =>
  http.post(url({ clusterName }), { params: [["name", nodeName]] });
