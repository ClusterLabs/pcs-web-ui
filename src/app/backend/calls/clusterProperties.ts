import { CallResult, endpoints, http } from "app/backend/tools";

const { shape, url } = endpoints.clusterProperties;

export const clusterProperties = async (
  clusterName: string,
): CallResult<typeof shape> => http.get(url({ clusterName }), { shape });
