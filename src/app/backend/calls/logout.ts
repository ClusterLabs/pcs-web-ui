import { api, endpoints, http } from "app/backend/tools";

const { url } = endpoints.logout;

export const logout = async (): api.CallResult => http.get(url);
