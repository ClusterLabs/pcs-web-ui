import { api, http } from "app/backend/tools";

export const canAddClusterOrNodes = async (
  clusterName: string,
  nodeNames: string[],
): api.CallResult =>
  http.get("/manage/can-add-cluster-or-nodes", {
    params: [
      ["cluster", clusterName],
      ...nodeNames.map(name => ["node_names[]", name] as [string, string]),
    ],
  });
