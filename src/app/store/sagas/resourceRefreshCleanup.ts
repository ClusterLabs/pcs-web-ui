import { PrimitiveResourceActions } from "app/store/actions";
import { ApiResult, resourceCleanup, resourceRefresh } from "app/backend";

import { call, put, takeEvery } from "./effects";
import { authSafe } from "./authSafe";
import { invalidResult, networkError } from "./backend";
import { putNotification } from "./notifications";

function* resourceRefreshSaga({
  payload: { resourceId, clusterUrlName },
}: PrimitiveResourceActions["ActionRefresh"]) {
  const taskLabel = `refresh resource "${resourceId}"`;
  try {
    const result: ApiResult<typeof resourceRefresh> = yield call(
      authSafe(resourceRefresh),
      { clusterUrlName, resourceId },
    );

    if (!result.valid) {
      yield invalidResult(result, taskLabel);
      return;
    }

    if ("error" in result.response) {
      const { stdout, stderror } = result.response;
      yield putNotification("ERROR", `Task failed: ${taskLabel}`, {
        type: "LINES",
        lines: ["backend error :", `stdout: ${stdout}`, `stderr: ${stderror}`],
      });
      return;
    }
    yield put({
      type: "CLUSTER_DATA.REFRESH",
      payload: { clusterUrlName },
    });
    yield putNotification("SUCCESS", `Succesfully done: ${taskLabel}`);
  } catch (error) {
    yield networkError(error, taskLabel);
  }
}

function* resourceCleanupSaga({
  payload: { resourceId, clusterUrlName },
}: PrimitiveResourceActions["ActionCleanup"]) {
  const taskLabel = `refresh resource "${resourceId}"`;
  try {
    const result: ApiResult<typeof resourceCleanup> = yield call(
      authSafe(resourceCleanup),
      { clusterUrlName, resourceId },
    );

    if (!result.valid) {
      yield invalidResult(result, taskLabel);
      return;
    }

    if ("error" in result.response) {
      const { stdout, stderror } = result.response;
      yield putNotification("ERROR", `Task failed: ${taskLabel}`, {
        type: "LINES",
        lines: ["backend error :", `stdout: ${stdout}`, `stderr: ${stderror}`],
      });
      return;
    }
    yield put({
      type: "CLUSTER_DATA.REFRESH",
      payload: { clusterUrlName },
    });
    yield putNotification("SUCCESS", `Succesfully done: ${taskLabel}`);
  } catch (error) {
    yield networkError(error, taskLabel);
  }
}
export default [
  takeEvery("RESOURCE.PRIMITIVE.REFRESH", resourceRefreshSaga),
  takeEvery("RESOURCE.PRIMITIVE.CLEANUP", resourceCleanupSaga),
];
