import { api, endpoints, http } from "app/backend/tools";

const { url } = endpoints.existingCluster;
export const existingCluster = async (nodeName: string): api.CallResult =>
  http.post(url, { params: [["node-name", nodeName]] });
