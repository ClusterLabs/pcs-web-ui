import { getJson } from "../calls";
import {
  ApiCall,
  createResult,
  dealWithInvalidJson,
  validateShape,
} from "../tools";

import { ApiClusterStatus, TApiClusterStatus } from "../types/clusterStatus";

export const clusterStatus: ApiCall<ApiClusterStatus> = async (
  clusterUrlName: string,
) => {
  try {
    const raw = await getJson(`/managec/${clusterUrlName}/cluster_status`);
    return createResult<ApiClusterStatus>(
      raw,
      validateShape(raw, TApiClusterStatus),
    );
  } catch (e) {
    return dealWithInvalidJson(e);
  }
};
