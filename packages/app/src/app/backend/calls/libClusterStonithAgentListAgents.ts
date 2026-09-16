import {type CallResult, endpoints, http} from "./tools";

const {shape, url, payload} = endpoints.libClusterStonithAgentListAgents;

export const libClusterStonithAgentListAgents = async (): CallResult<
  typeof shape
> => {
  return http.post(url, {
    payload,
    shape: shape,
  });
};
