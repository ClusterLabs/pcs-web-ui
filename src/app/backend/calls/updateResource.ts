import { CallResult, endpoints, http } from "app/backend/tools";

const { url, shape } = endpoints.updateResource;

export const updateResource = async (
  clusterName: string,
  resourceId: string,
  attributes: Record<string, string>,
): CallResult<typeof shape> => {
  const instanceAttrs: [string, string][] = Object.keys(attributes).map(key => [
    `_res_paramne_${key}`,
    attributes[key],
  ]);

  return http.post(url({ clusterName }), {
    params: [["resource_id", resourceId], ...instanceAttrs],
    shape,
  });
};
