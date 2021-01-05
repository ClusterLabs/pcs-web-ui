import { api, http } from "app/backend/tools";

export const removeResource = (
  clusterName: string,
  resourceIds: string[],
): api.CallResult =>
  http.post(`/managec/${clusterName}/remove_resource`, {
    params: [
      ["no_error_if_not_exists", "true"],
      ...resourceIds.map(id => [`resid-${id}`, "true"] as [string, string]),
    ],
  });
