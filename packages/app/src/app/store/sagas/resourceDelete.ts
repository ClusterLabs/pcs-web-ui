import {removeResource} from "app/backend";
import type {ActionMap} from "app/store/actions";

import {api, log, errorMessage, put} from "./common";
import {stripForceText} from "./clusterStopUtils";

export function* deleteResource({
  payload: {resourceId, resourceType, force},
}: ActionMap["RESOURCE.DELETE"]) {
  const result: api.ResultOf<typeof removeResource> = yield api.authSafe(
    removeResource,
    {
      resourceId,
      isStonith: resourceType === "fence-device",
      force,
    },
  );

  const taskLabel = `delete ${
    resourceType === "resource" ? "resource" : "fence device"
  } "${resourceId}"`;

  if (result.type !== "OK") {
    if (result.type !== "BAD_HTTP_STATUS") {
      log.error(result, taskLabel);
    }
    yield put({
      type: "RESOURCE.DELETE.FAIL",
      payload: {
        message: errorMessage(stripForceText(result), taskLabel),
        isForceable: "text" in result && result.text.includes("--force"),
      },
    });
    return;
  }

  yield put({type: "CLUSTER.STATUS.REFRESH"});

  yield put({type: "RESOURCE.DELETE.OK"});
}
