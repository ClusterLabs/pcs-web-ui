import {type CallResult, endpoints, http} from "./tools";

const {url, params} = endpoints.setResourceUtilization;

export const setResourceUtilization = ({
  resourceId,
  name,
  value,
}: Parameters<typeof params>[0]): CallResult =>
  http.post(url, {params: params({resourceId, name, value})});
