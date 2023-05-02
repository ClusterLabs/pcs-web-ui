import {resourceCleanup, resourceRefresh} from "app/backend";
import {ActionMap} from "app/store/actions";

import {api, clusterSuccess, processError, putNotification} from "./common";

export function* refreshSaga({
  key,
  payload: {resourceId, resourceType},
}: ActionMap["RESOURCE.REFRESH"]) {
  const result: api.ResultOf<typeof resourceRefresh> = yield api.authSafe(
    resourceRefresh,
    key.clusterName,
    resourceId,
  );
  const taskLabel = `refresh ${
    resourceType === "resource" ? "resource" : "fence device"
  } "${resourceId}"`;
  if (result.type !== "OK") {
    yield processError(result, taskLabel);
    return;
  }

  if ("error" in result.payload) {
    const {stdout, stderror} = result.payload;
    yield putNotification("ERROR", `Task failed: ${taskLabel}`, {
      type: "LINES",
      lines: ["backend error :", `stdout: ${stdout}`, `stderr: ${stderror}`],
    });
    return;
  }

  yield clusterSuccess(key.clusterName, taskLabel);
}

export function* cleanupSaga({
  key,
  payload: {resourceId, resourceType},
}: ActionMap["RESOURCE.CLEANUP"]) {
  const result: api.ResultOf<typeof resourceRefresh> = yield api.authSafe(
    resourceCleanup,
    key.clusterName,
    resourceId,
  );
  const taskLabel = `cleanup ${
    resourceType === "resource" ? "resource" : "fence device"
  } "${resourceId}"`;
  if (result.type !== "OK") {
    yield processError(result, taskLabel);
    return;
  }

  if ("error" in result.payload) {
    const {stdout, stderror} = result.payload;
    yield putNotification("ERROR", `Task failed: ${taskLabel}`, {
      type: "LINES",
      lines: ["backend error :", `stdout: ${stdout}`, `stderr: ${stderror}`],
    });
    return;
  }

  yield clusterSuccess(key.clusterName, taskLabel);
}
