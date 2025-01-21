import {type CallResult, endpoints, http} from "./tools";

const {shape, url, payload} = endpoints.libClusterResourceAgentListAgents;

export const libClusterResourceAgentListAgents = async ({
  clusterName,
}: {
  clusterName: string;
}): CallResult<typeof shape> => {
  return http.post(url({clusterName}), {
    payload,
    shape: shape,
  });
};
