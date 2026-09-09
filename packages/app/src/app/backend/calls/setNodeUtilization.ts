import {type CallResult, endpoints, http} from "./tools";

const {url, params} = endpoints.setNodeUtilization;

export const setNodeUtilization = ({
  nodeName,
  name,
  value,
}: Parameters<typeof params>[0]): CallResult =>
  http.post(url, {params: params({nodeName, name, value})});
