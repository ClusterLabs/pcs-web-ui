import { api, endpoints, http } from "app/backend/tools";

const { url } = endpoints.removeResource;

export const removeResource = (
  clusterName: string,
  resourceIds: string[],
): api.CallResult =>
  http.post(url({ clusterName }), {
    params: [
      ["no_error_if_not_exists", "true"],
      ...resourceIds.map(id => [`resid-${id}`, "true"] as [string, string]),
    ],
  });
