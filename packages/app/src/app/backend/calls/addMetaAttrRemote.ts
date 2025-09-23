import {type CallResult, endpoints, http} from "./tools";

const {url, params} = endpoints.addMetaAttrRemote;

export const addMetaAttrRemote = ({
  clusterName,
  resourceId,
  isStonith,
  name,
  value,
}: {clusterName: string} & Parameters<typeof params>[0]): CallResult =>
  http.post(url({clusterName}), {
    params: params({resourceId, isStonith, name, value}),
  });
