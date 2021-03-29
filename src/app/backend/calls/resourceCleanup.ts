import { CallResult, endpoints, http } from "./tools";

const { url, shape } = endpoints.resourceCleanup;

export const resourceCleanup = async (
  clusterName: string,
  resourceId: string,
): CallResult<typeof shape> =>
  http.post(url({ clusterName }), {
    params: [
      ["resource", resourceId],
      ["strict", "1"],
    ],
    shape,
  });
