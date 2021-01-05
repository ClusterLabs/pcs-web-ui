import { api, http, t } from "app/backend/tools";

const shape = t.partial({
  error: t.literal("true"),
  stdout: t.string,
  stderr: t.string,
});

export const updateResource = async (
  clusterName: string,
  resourceId: string,
  attributes: Record<string, string>,
): api.CallResult<typeof shape> => {
  const instanceAttrs: [string, string][] = Object.keys(attributes).map(key => [
    `_res_paramne_${key}`,
    attributes[key],
  ]);

  return http.post(`/managec/${clusterName}/update_resource`, {
    params: [["resource_id", resourceId], ...instanceAttrs],
    shape,
  });
};
