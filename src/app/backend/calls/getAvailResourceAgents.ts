import { CallResult, endpoints, http } from "./tools";

const { url, shape } = endpoints.getAvailResourceAgents;

export const getAvailResourceAgents = async (
  clusterName: string,
): CallResult<typeof shape> => http.get(url({ clusterName }), { shape });
