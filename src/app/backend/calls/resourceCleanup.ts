import { api, endpoints, http } from "app/backend/tools";

const { url, shape } = endpoints.resourceCleanup;

export const resourceCleanup = async (
  clusterName: string,
  resourceId: string,
): api.CallResult<typeof shape> =>
  http.post(url({ clusterName }), {
    params: [
      ["resource", resourceId],
      ["strict", "1"],
    ],
    shape,
  });
