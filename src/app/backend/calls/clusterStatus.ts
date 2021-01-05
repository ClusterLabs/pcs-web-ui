import { api, http } from "app/backend/tools";

import { TApiClusterStatus as shape } from "../types/clusterStatus";

export const clusterStatus = async (
  clusterName: string,
): api.CallResult<typeof shape> =>
  http.get(`/managec/${clusterName}/cluster_status`, { shape });
