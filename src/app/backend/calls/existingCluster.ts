import { api, http } from "app/backend/tools";

export const existingCluster = async (nodeName: string): api.CallResult =>
  http.post("/manage/existingcluster", { params: [["node-name", nodeName]] });
