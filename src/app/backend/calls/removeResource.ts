import { api, http } from "app/backend/tools";

export const removeResource = (
  clusterUrlName: string,
  resourceIds: string[],
): api.CallResult =>
  http.post(`/managec/${clusterUrlName}/remove_resource`, {
    params: [
      ["no_error_if_not_exists", "true"],
      ...resourceIds.map(id => [`resid-${id}`, "true"] as [string, string]),
    ],
  });
