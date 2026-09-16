import {type CallResult, endpoints, http} from "./tools";

const {url, params} = endpoints.addMetaAttrRemote;

export const addMetaAttrRemote = ({
  resourceId,
  isStonith,
  name,
  value,
}: Parameters<typeof params>[0]): CallResult =>
  http.post(url, {params: params({resourceId, isStonith, name, value})});
