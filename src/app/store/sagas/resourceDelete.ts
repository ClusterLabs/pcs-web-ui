import { removeResource } from "app/backend";
import { ActionMap } from "app/store/actions";

import {
  api,
  formatResourcesMsg,
  processClusterResultBasic,
  takeEvery,
} from "./common";

export function* deleteResource({
  payload: { clusterUrlName, resourceIds },
}: ActionMap["RESOURCE.DELETE"]) {
  const result: api.ResultOf<typeof removeResource> = yield api.authSafe(
    removeResource,
    clusterUrlName,
    resourceIds,
  );

  yield processClusterResultBasic(
    clusterUrlName,
    `delete ${formatResourcesMsg(resourceIds)}`,
    result,
  );
}

export default [takeEvery("RESOURCE.DELETE", deleteResource)];
