import {CallResult, endpoints, http} from "./tools";

const {shape, url, payload} = endpoints.libClusterStonithAgentDescribeAgent;

export const libClusterStonithAgentDescribeAgent = async ({
  clusterName,
  agentName,
}: {
  clusterName: string;
  agentName: string;
}): CallResult<typeof shape> => {
  return http.post(url({clusterName}), {
    payload: payload(agentName),
    shape: shape,
  });
};
