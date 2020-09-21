import { PrimitiveResourceActions } from "app/store/actions";
import { ApiResult, log, resourceUnmanage } from "app/backend";

import { call, takeEvery } from "./effects";
import { authSafe } from "./authSafe";
import { putNotification } from "./notifications";
import { processLibraryResponse } from "./lib";

function* resourceUnmanageSaga({
  payload: { resourceNameList, clusterUrlName },
}: PrimitiveResourceActions["ActionUnmanage"]) {
  const resourcesInMsg =
    resourceNameList.length === 1
      ? `resource "${resourceNameList[0]}"`
      : `resources ${resourceNameList.map(r => `"${r}"`).join(", ")}`;

  const errorDescription = `Communication error while unmanaging ${resourcesInMsg}`;
  try {
    const result: ApiResult<typeof resourceUnmanage> = yield call(
      authSafe(resourceUnmanage),
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
      taskLabel: `unmanage ${resourcesInMsg}`,
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

export default [takeEvery("RESOURCE.PRIMITIVE.UNMANAGE", resourceUnmanageSaga)];
