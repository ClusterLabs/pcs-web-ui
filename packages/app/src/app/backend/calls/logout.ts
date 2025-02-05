import {type CallResult, endpoints, http} from "./tools";

const {url} = endpoints.logout;

export const logout = async (): CallResult => http.get(url);
