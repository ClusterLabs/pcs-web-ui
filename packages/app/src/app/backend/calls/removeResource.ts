import {type CallResult, endpoints, http} from "./tools";

const {url, params} = endpoints.removeResource;

export const removeResource = ({
  clusterName,
  resourceId,
  isStonith,
  force,
}: {
  clusterName: string;
  resourceId: string;
  isStonith: boolean;
  force: boolean;
}): CallResult => {
  return http.post(url({clusterName}), {
    params: params({resourceId, isStonith, force}),
  });
};
