import {type CallResult, endpoints, http} from "./tools";

const {url} = endpoints.resourceClone;

export const resourceClone = (resourceId: string): CallResult =>
  http.post(url, {params: [["resource_id", resourceId]]});
