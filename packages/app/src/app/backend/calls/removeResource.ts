import {type CallResult, endpoints, http} from "./tools";

const {url} = endpoints.removeResource;

export const removeResource = (
  clusterName: string,
  resourceId: string,
  isStonith: boolean,
): CallResult =>
  http.post(url({clusterName}), {
    params: [
      ["no_error_if_not_exists", "true"],
      [`resid-${resourceId}`, "true"],
      ...[(isStonith ? ["is-stonith", "true"] : []) as [string, string]],
    ],
  });
