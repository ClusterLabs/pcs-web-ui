import { CallResult, endpoints, http } from "./tools";

const { url, shape } = endpoints.importedClusterList;

export const importedClusterList = async (): CallResult<typeof shape> =>
  http.get(url, { shape });
