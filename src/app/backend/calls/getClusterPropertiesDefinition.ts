import { CallResult, endpoints, http } from "./tools";

const { shape, url } = endpoints.getClusterPropertiesDefinition;

export const getClusterPropertiesDefinition = async (
  clusterName: string,
): CallResult<typeof shape> => http.get(url({ clusterName }), { shape });
