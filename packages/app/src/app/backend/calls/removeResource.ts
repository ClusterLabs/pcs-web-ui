import {type CallResult, endpoints, http} from "./tools";

const {url, params} = endpoints.removeResource;

export const removeResource = ({
  resourceId,
  isStonith,
  force,
}: {
  resourceId: string;
  isStonith: boolean;
  force: boolean;
}): CallResult =>
  http.post(url, {params: params({resourceId, isStonith, force})});
