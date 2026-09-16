import {type CallResult, endpoints, http} from "./tools";

const {shape, url, payload} = endpoints.libClusterResourceAgentDescribeAgent;

export const libClusterResourceAgentDescribeAgent = async ({
  agentName,
}: {
  agentName: string;
}): CallResult<typeof shape> => {
  return http.post(url, {
    payload: payload(agentName),
    shape: shape,
  });
};
