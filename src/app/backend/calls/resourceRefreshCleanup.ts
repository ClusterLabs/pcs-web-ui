import { api, http, t } from "app/backend/tools";

const shape = t.union([
  t.type({ success: t.literal("true") }),
  t.type({
    error: t.literal("true"),
    stdout: t.string,
    stderror: t.string,
  }),
]);

export const resourceRefresh: api.CallShape<typeof shape> = async (
  clusterUrlName: string,
  resourceId: string,
) =>
  http.post(`/managec/${clusterUrlName}/resource_refresh`, {
    params: [
      ["resource", resourceId],
      ["strict", "1"],
    ],
    shape,
  });

export const resourceCleanup: api.CallShape<typeof shape> = async (
  clusterUrlName: string,
  resourceId: string,
) =>
  http.post(`/managec/${clusterUrlName}/resource_cleanup`, {
    params: [
      ["resource", resourceId],
      ["strict", "1"],
    ],
    shape,
  });
