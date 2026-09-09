import {type CallResult, endpoints, http} from "./tools";

const {url} = endpoints.resourceUnclone;

export const resourceUnclone = (resourceId: string): CallResult =>
  http.post(url, {params: [["resource_id", resourceId]]});
