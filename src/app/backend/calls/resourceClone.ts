import { api, http } from "app/backend/tools";

export const resourceClone = (
  clusterName: string,
  resourceId: string,
): api.CallResult =>
  http.post(`/managec/${clusterName}/resource_clone`, {
    params: [["resource_id", resourceId]],
  });
