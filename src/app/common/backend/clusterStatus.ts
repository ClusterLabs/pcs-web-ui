import * as api from "app/common/api";
import {
  ApiCall,
  createResult,
  validateShape,
  dealWithInvalidJson,
} from "./tools";

import { ApiClusterStatus, TApiClusterStatus } from "./clusterStatusTypes";

const clusterStatus: ApiCall<ApiClusterStatus> = async (
  clusterUrlName:string,
) => {
  try {
    const raw = await api.call.getJson(
      `/managec/${clusterUrlName}/cluster_status`,
    );
    return createResult<ApiClusterStatus>(
      raw,
      validateShape(raw, TApiClusterStatus),
    );
  } catch (e) {
    return dealWithInvalidJson(e);
  }
};

export default clusterStatus;
