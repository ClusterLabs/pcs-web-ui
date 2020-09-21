import { PrimitiveResourceActions } from "app/store/actions";
import { ApiResult, log, resourceDisable } from "app/backend";

import { call, takeEvery } from "./effects";
import { authSafe } from "./authSafe";
import { putNotification } from "./notifications";
import { processLibraryResponse } from "./lib";

function* resourceDisableSaga({
  payload: { resourceNameList, clusterUrlName },
}: PrimitiveResourceActions["ActionDisable"]) {
  const resourcesInMsg =
    resourceNameList.length === 1
      ? `resource "${resourceNameList[0]}"`
      : `resources ${resourceNameList.map(r => `"${r}"`).join(", ")}`;

  const errorDescription = `Communication error while unmanaging ${resourcesInMsg}`;
  try {
    const result: ApiResult<typeof resourceDisable> = yield call(
      authSafe(resourceDisable),
      {
        clusterUrlName,
        resourceNameList,
      },
    );

    if (!result.valid) {
      log.invalidResponse(result, errorDescription);
      yield putNotification(
        "ERROR",
        `${errorDescription}. Details in the browser console`,
      );
      return;
    }

    yield processLibraryResponse({
      taskLabel: `disable ${resourcesInMsg}`,
      clusterUrlName,
      response: result.response,
    });
  } catch (error) {
    log.error(error, errorDescription);
    yield putNotification(
      "ERROR",
      `${errorDescription}. Details in the browser console`,
    );
  }
}

export default [takeEvery("RESOURCE.PRIMITIVE.DISABLE", resourceDisableSaga)];
