import { api, http } from "app/backend/tools";

import * as types from "../types";

const shape = types.clusterProperties.TApiClusterProperties;

export const clusterProperties: api.CallShape<typeof shape> = async (
  clusterUrlName: string,
) => http.get(`/managec/${clusterUrlName}/cluster_properties`, { shape });
