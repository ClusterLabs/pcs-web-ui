import {type CallResult, endpoints, http} from "./tools";

const {url, params} = endpoints.addNodeAttrRemote;

export const addNodeAttrRemote = ({
  clusterName,
  nodeName,
  name,
  value,
}: {clusterName: string} & Parameters<typeof params>[0]): CallResult =>
  http.post(url({clusterName}), {
    params: params({nodeName, name, value}),
  });
