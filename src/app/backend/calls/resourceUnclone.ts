import { api, http } from "app/backend/tools";

export const resourceUnclone = (
  clusterName: string,
  resourceId: string,
): api.CallResult =>
  http.post(`/managec/${clusterName}/resource_unclone`, {
    params: [["resource_id", resourceId]],
  });
