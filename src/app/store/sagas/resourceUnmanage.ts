import { PrimitiveResourceActions } from "app/store/actions";
import { ApiResult, resourceManage, resourceUnmanage } from "app/backend";

import { call, takeEvery } from "./effects";
import { authSafe } from "./authSafe";
import {
  formatResourcesMsg,
  invalidResult,
  networkError,
  processLibraryResponse,
} from "./lib";

function* resourceUnmanageSaga({
  payload: { resourceNameList, clusterUrlName },
}: PrimitiveResourceActions["ActionUnmanage"]) {
  const taskLabel = `unmanage ${formatResourcesMsg(resourceNameList)}`;
  try {
    const result: ApiResult<typeof resourceUnmanage> = yield call(
      authSafe(resourceUnmanage),
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

function* resourceManageSaga({
  payload: { resourceNameList, clusterUrlName },
}: PrimitiveResourceActions["ActionManage"]) {
  const taskLabel = `manage ${formatResourcesMsg(resourceNameList)}`;
  try {
    const result: ApiResult<typeof resourceManage> = yield call(
      authSafe(resourceManage),
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
  takeEvery("RESOURCE.PRIMITIVE.UNMANAGE", resourceUnmanageSaga),
  takeEvery("RESOURCE.PRIMITIVE.MANAGE", resourceManageSaga),
];
