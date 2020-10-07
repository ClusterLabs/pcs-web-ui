import { removeResource } from "app/backend";
import { PrimitiveResourceActions } from "app/store/actions";

import {
  api,
  formatResourcesMsg,
  processClusterResultBasic,
  takeEvery,
} from "./common";

export function* deleteResource({
  payload: { clusterUrlName, resourceIds },
}: PrimitiveResourceActions["ActionDelete"]) {
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

export default [takeEvery("RESOURCE.PRIMITIVE.DELETE", deleteResource)];
