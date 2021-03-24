import { CallResult, endpoints, http } from "./tools";

const { url } = endpoints.clusterStart;
export const clusterStart = async (
  clusterName: string,
  nodeName: string,
): CallResult =>
  http.post(url({ clusterName }), { params: [["name", nodeName]] });
