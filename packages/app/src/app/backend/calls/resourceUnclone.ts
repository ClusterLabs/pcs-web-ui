import {CallResult, endpoints, http} from "./tools";

const {url} = endpoints.resourceUnclone;

export const resourceUnclone = (
  clusterName: string,
  resourceId: string,
): CallResult =>
  http.post(url({clusterName}), {params: [["resource_id", resourceId]]});
