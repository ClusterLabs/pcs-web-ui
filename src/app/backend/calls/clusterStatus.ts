import { api, http } from "app/backend/tools";

import { TApiClusterStatus as shape } from "../types/clusterStatus";

export const clusterStatus = async (
  clusterUrlName: string,
): api.CallResult<typeof shape> =>
  http.get(`/managec/${clusterUrlName}/cluster_status`, { shape });
