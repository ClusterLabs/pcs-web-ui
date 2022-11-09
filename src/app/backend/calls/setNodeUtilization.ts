import {CallResult, endpoints, http} from "./tools";

const {url, params} = endpoints.setNodeUtilization;

export const setNodeUtilization = ({
  clusterName,
  nodeName,
  name,
  value,
}: {clusterName: string} & Parameters<typeof params>[0]): CallResult =>
  http.post(url({clusterName}), {
    params: params({nodeName, name, value}),
  });
