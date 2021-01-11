import { api, endpoints, http } from "app/backend/tools";

const { shape, url } = endpoints.clusterProperties;

export const clusterProperties = async (
  clusterName: string,
): api.CallResult<typeof shape> => http.get(url({ clusterName }), { shape });
