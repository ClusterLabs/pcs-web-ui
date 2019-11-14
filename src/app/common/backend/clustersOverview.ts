import * as api from "app/common/api";
import {
  ApiCall,
  createResult,
  validateShape,
  dealWithInvalidJson,
} from "./tools";

import {
  ApiClustersOverview,
  TApiClustersOverview,
} from "./types/clusterOverview";

const clustersOverview: ApiCall<ApiClustersOverview> = async () => {
  try {
    const raw = await api.call.getJson("/clusters_overview");
    return createResult<ApiClustersOverview>(
      raw,
      validateShape(raw, TApiClustersOverview),
    );
  } catch (e) {
    return dealWithInvalidJson(e);
  }
};

export default clustersOverview;
