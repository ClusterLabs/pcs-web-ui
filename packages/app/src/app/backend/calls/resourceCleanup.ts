import {type CallResult, endpoints, http} from "./tools";

const {url, shape} = endpoints.resourceCleanup;

export const resourceCleanup = async (
  resourceId: string,
): CallResult<typeof shape> =>
  http.post(url, {
    // parameter "strict" does not work with cleanup and causes an error
    params: [["resource", resourceId]],
    shape,
  });
