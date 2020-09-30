import { api, http } from "app/backend/tools";

import { TApiClusterStatus as shape } from "../types/clusterStatus";

export const clusterStatus: api.CallShape<typeof shape> = async (
  clusterUrlName: string,
) => http.get(`/managec/${clusterUrlName}/cluster_status`, { shape });
