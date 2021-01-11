import { api, endpoints, http } from "app/backend/tools";

const { url, shape } = endpoints.importedClusterList;

export const importedClusterList = async (): api.CallResult<typeof shape> =>
  http.get(url, { shape });
