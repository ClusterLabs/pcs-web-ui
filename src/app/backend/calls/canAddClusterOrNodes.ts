import { CallResult, endpoints, http } from "./tools";

export const canAddClusterOrNodes = async (
  checkParams: { clusterName: string } | { nodeNames: string[] },
): CallResult => {
  return http.get(endpoints.canAddClusterOrNodes.url, {
    params:
      "clusterName" in checkParams
        ? [["cluster", checkParams.clusterName]]
        : checkParams.nodeNames.map(name => ["node_names[]", name]),
  });
};
