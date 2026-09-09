import {type CallResult, endpoints, http} from "./tools";

const {url, shape} = endpoints.resourceRefresh;

export const resourceRefresh = async (
  resourceId: string,
): CallResult<typeof shape> =>
  http.post(url, {
    params: [
      ["resource", resourceId],
      ["strict", "1"],
    ],
    shape,
  });
