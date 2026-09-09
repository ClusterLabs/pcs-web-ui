import {type CallResult, endpoints, http} from "./tools";

const {url, params} = endpoints.addConstraintRemote;

export const addConstraintRemote = async ({
  constraint,
}: {
  constraint: Parameters<typeof params>[0]["constraint"];
}): CallResult => http.post(url, {params: params({constraint})});
