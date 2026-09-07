import {type CallResult, endpoints, http} from "./tools";

const {url, shape} = endpoints.clusterStatus;

export const clusterStatus = async (): CallResult<typeof shape> =>
  http.get(url, {shape});
