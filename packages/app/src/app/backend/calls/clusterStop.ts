import {type CallResult, endpoints, http} from "./tools";

const {url, params} = endpoints.clusterStop;

export const clusterStop = async ({
  nodeName,
  force,
}: {
  nodeName?: string;
  force: boolean;
}): CallResult => http.post(url, {params: params({nodeName, force})});
