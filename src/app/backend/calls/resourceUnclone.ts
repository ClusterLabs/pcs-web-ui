import { api, http } from "app/backend/tools";

export const resourceUnclone = (
  clusterUrlName: string,
  resourceId: string,
): api.CallResult =>
  http.post(`/managec/${clusterUrlName}/resource_unclone`, {
    params: [["resource_id", resourceId]],
  });
