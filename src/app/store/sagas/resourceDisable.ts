import { PrimitiveResourceActions } from "app/store/actions";
import { ApiResult, resourceDisable, resourceEnable } from "app/backend";

import { call, takeEvery } from "./effects";
import { authSafe } from "./authSafe";
import {
  formatResourcesMsg,
  invalidResult,
  networkError,
  processLibraryResponse,
} from "./lib";

function* resourceDisableSaga({
  payload: { resourceNameList, clusterUrlName },
}: PrimitiveResourceActions["ActionDisable"]) {
  const taskLabel = `disable ${formatResourcesMsg(resourceNameList)}`;
  try {
    const result: ApiResult<typeof resourceDisable> = yield call(
      authSafe(resourceDisable),
      {
        clusterUrlName,
        resourceNameList,
      },
    );

    if (!result.valid) {
      yield invalidResult(result, taskLabel);
      return;
    }

    yield processLibraryResponse({
      taskLabel,
      clusterUrlName,
      response: result.response,
    });
  } catch (error) {
    networkError(error, taskLabel);
  }
}

function* resourceEnableSaga({
  payload: { resourceNameList, clusterUrlName },
}: PrimitiveResourceActions["ActionEnable"]) {
  const taskLabel = `enable ${formatResourcesMsg(resourceNameList)}`;
  try {
    const result: ApiResult<typeof resourceEnable> = yield call(
      authSafe(resourceEnable),
      {
        clusterUrlName,
        resourceNameList,
      },
    );

    if (!result.valid) {
      yield invalidResult(result, taskLabel);
      return;
    }

    yield processLibraryResponse({
      taskLabel,
      clusterUrlName,
      response: result.response,
    });
  } catch (error) {
    networkError(error, taskLabel);
  }
}

export default [
  takeEvery("RESOURCE.PRIMITIVE.DISABLE", resourceDisableSaga),
  takeEvery("RESOURCE.PRIMITIVE.ENABLE", resourceEnableSaga),
];
