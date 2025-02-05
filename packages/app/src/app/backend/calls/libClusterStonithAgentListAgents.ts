import {type CallResult, endpoints, http} from "./tools";

const {shape, url, payload} = endpoints.libClusterStonithAgentListAgents;

export const libClusterStonithAgentListAgents = async ({
  clusterName,
}: {
  clusterName: string;
}): CallResult<typeof shape> => {
  return http.post(url({clusterName}), {
    payload,
    shape: shape,
  });
};
