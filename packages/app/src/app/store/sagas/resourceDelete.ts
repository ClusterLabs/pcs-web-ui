import {removeResource} from "app/backend";
import type {ActionMap} from "app/store/actions";

import {api, processClusterResultBasic} from "./common";

export function* deleteResource({
  key,
  payload: {resourceId, resourceType},
}: ActionMap["RESOURCE.DELETE"]) {
  const result: api.ResultOf<typeof removeResource> = yield api.authSafe(
    removeResource,
    key.clusterName,
    resourceId,
    resourceType === "fence-device",
  );

  yield processClusterResultBasic(
    key.clusterName,
    `delete ${
      resourceType === "resource" ? "resource" : "fence device"
    } "${resourceId}"`,
    result,
  );
}
