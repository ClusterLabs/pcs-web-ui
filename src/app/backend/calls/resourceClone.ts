import { api, http } from "app/backend/tools";

export const resourceClone = (
  clusterUrlName: string,
  resourceId: string,
): api.CallResult =>
  http.post(`/managec/${clusterUrlName}/resource_clone`, {
    params: [["resource_id", resourceId]],
  });
