import { getJson } from "../calls";

import {
  ApiCall,
  createResult,
  dealWithInvalidJson,
  validateShape,
} from "../tools";

import {
  ApiClusterProperties,
  TApiClusterProperties,
} from "../types/clusterProperties";

export const clusterProperties: ApiCall<ApiClusterProperties> = async (
  clusterUrlName: string,
) => {
  try {
    const raw = await getJson(`/managec/${clusterUrlName}/cluster_properties`);
    return createResult<ApiClusterProperties>(
      raw,
      validateShape(raw, TApiClusterProperties),
    );
  } catch (e) {
    return dealWithInvalidJson(e);
  }
};
