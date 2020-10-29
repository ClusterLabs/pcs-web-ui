import { api, http } from "app/backend/tools";

export const canAddClusterOrNodes = async (
  checkParams: { clusterName: string } | { nodeNames: string[] },
): api.CallResult => {
  return http.get("/manage/can-add-cluster-or-nodes", {
    params:
      "clusterName" in checkParams
        ? [["cluster", checkParams.clusterName]]
        : checkParams.nodeNames.map(name => ["node_names[]", name]),
  });
};
