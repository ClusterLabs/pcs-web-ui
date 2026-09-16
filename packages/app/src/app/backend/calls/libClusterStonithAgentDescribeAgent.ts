import {type CallResult, endpoints, http} from "./tools";

const {shape, url, payload} = endpoints.libClusterStonithAgentDescribeAgent;

export const libClusterStonithAgentDescribeAgent = async ({
  agentName,
}: {
  agentName: string;
}): CallResult<typeof shape> => {
  return http.post(url, {
    payload: payload(agentName),
    shape: shape,
  });
};
