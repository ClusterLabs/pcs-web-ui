import { api, http } from "app/backend/tools";

import * as types from "../types";

const shape = types.clusterProperties.TApiClusterProperties;

export const clusterProperties = async (
  clusterUrlName: string,
): api.CallResult<typeof shape> =>
  http.get(`/managec/${clusterUrlName}/cluster_properties`, { shape });
