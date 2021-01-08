import { api, endpoints, http } from "app/backend/tools";

const { url, shape } = endpoints.getAvailResourceAgents;

export const getAvailResourceAgents = async (
  clusterName: string,
): api.CallResult<typeof shape> => http.get(url({ clusterName }), { shape });
