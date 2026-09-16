import {type CallResult, endpoints, http} from "./tools";

const {shape, url} = endpoints.getClusterPropertiesDefinition;

export const getClusterPropertiesDefinition = async (): CallResult<
  typeof shape
> => http.get(url, {shape});
