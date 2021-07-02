import { CallResult, endpoints, http } from "./tools";

const { url, params } = endpoints.sendKnownHostsToNode;
export const sendKnownHostsToNode = async (
  callParams: Parameters<typeof params>[0],
): CallResult => http.post(url, { params: params(callParams) });
