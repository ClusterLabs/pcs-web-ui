import {type CallResult, endpoints, http} from "./tools";

const {url, params} = endpoints.addNodeAttrRemote;

export const addNodeAttrRemote = ({
  nodeName,
  name,
  value,
}: Parameters<typeof params>[0]): CallResult =>
  http.post(url, {params: params({nodeName, name, value})});
