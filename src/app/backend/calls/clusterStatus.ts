import { api, endpoints, http } from "app/backend/tools";

const { url, shape } = endpoints.clusterStatus;

export const clusterStatus = async (
  clusterName: string,
): api.CallResult<typeof shape> => http.get(url({ clusterName }), { shape });
