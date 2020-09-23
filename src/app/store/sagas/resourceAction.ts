import { PrimitiveResourceActions } from "app/store/actions";
import {
  ApiResult,
  resourceDisable,
  resourceEnable,
  resourceManage,
  resourceUnmanage,
} from "app/backend";

import { call, takeEvery } from "./effects";
import { authSafe } from "./authSafe";
import { formatResourcesMsg, processLibraryResponse } from "./lib";
import { invalidResult, networkError } from "./backend";

function* resourceDisableSaga({
  payload: { resourceNameList, clusterUrlName },
}: PrimitiveResourceActions["ActionDisable"]) {
  const taskLabel = `disable ${formatResourcesMsg(resourceNameList)}`;
  try {
    const result: ApiResult<typeof resourceDisable> = yield call(
      authSafe(resourceDisable),
      { clusterUrlName, resourceNameList },
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
    yield networkError(error, taskLabel);
  }
}

function* resourceEnableSaga({
  payload: { resourceNameList, clusterUrlName },
}: PrimitiveResourceActions["ActionEnable"]) {
  const taskLabel = `enable ${formatResourcesMsg(resourceNameList)}`;
  try {
    const result: ApiResult<typeof resourceEnable> = yield call(
      authSafe(resourceEnable),
      { clusterUrlName, resourceNameList },
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
    yield networkError(error, taskLabel);
  }
}
function* resourceUnmanageSaga({
  payload: { resourceNameList, clusterUrlName },
}: PrimitiveResourceActions["ActionUnmanage"]) {
  const taskLabel = `unmanage ${formatResourcesMsg(resourceNameList)}`;
  try {
    const result: ApiResult<typeof resourceUnmanage> = yield call(
      authSafe(resourceUnmanage),
      { clusterUrlName, resourceNameList },
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
    yield networkError(error, taskLabel);
  }
}

function* resourceManageSaga({
  payload: { resourceNameList, clusterUrlName },
}: PrimitiveResourceActions["ActionManage"]) {
  const taskLabel = `manage ${formatResourcesMsg(resourceNameList)}`;
  try {
    const result: ApiResult<typeof resourceManage> = yield call(
      authSafe(resourceManage),
      { clusterUrlName, resourceNameList },
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
    yield networkError(error, taskLabel);
  }
}

export default [
  takeEvery("RESOURCE.PRIMITIVE.DISABLE", resourceDisableSaga),
  takeEvery("RESOURCE.PRIMITIVE.ENABLE", resourceEnableSaga),
  takeEvery("RESOURCE.PRIMITIVE.UNMANAGE", resourceUnmanageSaga),
  takeEvery("RESOURCE.PRIMITIVE.MANAGE", resourceManageSaga),
];
