import { getJson } from "./calls";
import {
  ApiCall,
  createResult,
  dealWithInvalidJson,
  validateShape,
} from "./tools";

import {
  ApiClustersOverview,
  TApiClustersOverview,
} from "./types/clusterOverview";

export const clustersOverview: ApiCall<ApiClustersOverview> = async () => {
  try {
    const raw = await getJson("/clusters_overview");
    return createResult<ApiClustersOverview>(
      raw,
      validateShape(raw, TApiClustersOverview),
    );
  } catch (e) {
    return dealWithInvalidJson(e);
  }
};
