import { api, endpoints, http } from "app/backend/tools";

const { url } = endpoints.clusterStart;
export const clusterStart = async (
  clusterName: string,
  nodeName: string,
): api.CallResult =>
  http.post(url({ clusterName }), { params: [["name", nodeName]] });
