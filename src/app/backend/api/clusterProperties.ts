import { getJson } from "../calls";
import {
  ApiCall,
  createResult,
  dealWithInvalidJson,
  validateShape,
} from "../tools";
import * as types from "../types";

type ApiClusterProperties = types.clusterProperties.ApiClusterProperties;

export const clusterProperties: ApiCall<ApiClusterProperties> = async (
  clusterUrlName: string,
) => {
  try {
    const raw = await getJson(`/managec/${clusterUrlName}/cluster_properties`);
    return createResult<ApiClusterProperties>(
      raw,
      validateShape(raw, types.clusterProperties.TApiClusterProperties),
    );
  } catch (e) {
    return dealWithInvalidJson(e);
  }
};
