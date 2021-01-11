import { api, endpoints, http } from "app/backend/tools";

const { url } = endpoints.resourceClone;

export const resourceClone = (
  clusterName: string,
  resourceId: string,
): api.CallResult =>
  http.post(url({ clusterName }), { params: [["resource_id", resourceId]] });
