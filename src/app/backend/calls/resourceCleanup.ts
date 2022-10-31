import {CallResult, endpoints, http} from "./tools";

const {url, shape} = endpoints.resourceCleanup;

export const resourceCleanup = async (
  clusterName: string,
  resourceId: string,
): CallResult<typeof shape> =>
  http.post(url({clusterName}), {
    // parameter "strict" does not work with cleanup and causes an error
    params: [["resource", resourceId]],
    shape,
  });
