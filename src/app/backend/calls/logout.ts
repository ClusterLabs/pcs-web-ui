import { CallResult, endpoints, http } from "app/backend/tools";

const { url } = endpoints.logout;

export const logout = async (): CallResult => http.get(url);
