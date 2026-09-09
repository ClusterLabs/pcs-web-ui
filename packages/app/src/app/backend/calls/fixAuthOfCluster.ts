import {type CallResult, endpoints, http} from "./tools";

const {url} = endpoints.fixAuthOfCluster;

export const fixAuthOfCluster = async (): CallResult => http.post(url);
