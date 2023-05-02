import {CallResult, endpoints, http} from "./tools";

const {url, shape, params} = endpoints.updateResource;

type ParamArgs = Parameters<typeof params>[0];

export const updateResource = async (
  clusterName: string,
  resourceId: ParamArgs["resourceId"],
  attributes: ParamArgs["attributes"],
): CallResult<typeof shape> =>
  http.post(url({clusterName}), {
    params: params({resourceId, attributes}),
    shape,
  });
