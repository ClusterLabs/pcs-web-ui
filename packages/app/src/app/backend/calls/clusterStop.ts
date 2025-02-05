import {type CallResult, endpoints, http} from "./tools";

const {url, params} = endpoints.clusterStop;

export const clusterStop = async ({
  clusterName,
  nodeName,
  force,
}: {
  clusterName: string;
  nodeName?: string;
  force: boolean;
}): CallResult =>
  http.post(url({clusterName}), {
    params: params({nodeName, force}),
  });
