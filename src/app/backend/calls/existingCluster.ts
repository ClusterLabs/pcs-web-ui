import { api, http } from "app/backend/tools";

export const existingCluster: api.Call<string> = async (nodeName: string) =>
  http.post("/manage/existingcluster", { params: [["node-name", nodeName]] });
