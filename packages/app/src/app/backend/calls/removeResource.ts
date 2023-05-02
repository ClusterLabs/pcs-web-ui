import {CallResult, endpoints, http} from "./tools";

const {url} = endpoints.removeResource;

export const removeResource = (
  clusterName: string,
  resourceIds: string[],
): CallResult =>
  http.post(url({clusterName}), {
    params: [
      ["no_error_if_not_exists", "true"],
      ...resourceIds.map(id => [`resid-${id}`, "true"] as [string, string]),
    ],
  });
