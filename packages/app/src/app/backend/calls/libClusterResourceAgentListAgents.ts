import {type CallResult, endpoints, http} from "./tools";

const {shape, url, payload} = endpoints.libClusterResourceAgentListAgents;

export const libClusterResourceAgentListAgents = async (): CallResult<
  typeof shape
> => {
  return http.post(url, {
    payload,
    shape: shape,
  });
};
