import { Action, PrimitiveResourceActions } from "app/store/actions";
import { ApiResult, log, resourceCreate } from "app/backend";

import { call, put, race, take, takeEvery } from "./effects";
import { authSafe } from "./authSafe";
import { libraryResponseSwitch } from "./lib";

function* resourceCreateSaga({
  payload: { agentName, resourceName, instanceAttrs, clusterUrlName, disabled },
}: PrimitiveResourceActions["CreateResource"]) {
  const errorAction: Action = {
    type: "RESOURCE.PRIMITIVE.CREATE.ERROR",
    payload: { clusterUrlName },
  };
  const taskLabel = `create resource "${resourceName}"`;
  const errorDescription = `Communication error while: ${taskLabel}`;

  try {
    const { result }: { result: ApiResult<typeof resourceCreate> } = yield race(
      {
        result: call(authSafe(resourceCreate), {
          clusterUrlName,
          resourceName,
          agentName,
          instanceAttrs,
          disabled,
        }),
        cancel: take("RESOURCE.PRIMITIVE.CREATE.CANCEL"),
      },
    );

    if (!result) {
      // we no longer care about the fate of the call
      return;
    }

    if (!result.valid) {
      log.invalidResponse(result, errorDescription);
      yield put(errorAction);
      return;
    }

    /* eslint-disable-next-line camelcase */
    const { report_list } = result.response;

    yield libraryResponseSwitch({
      clusterUrlName,
      response: result.response,
      taskLabel,
      successAction: {
        type: "RESOURCE.PRIMITIVE.CREATE.SUCCESS",
        payload: { clusterUrlName, reports: report_list },
      },
      errorAction: {
        type: "RESOURCE.PRIMITIVE.CREATE.FAILED",
        payload: { clusterUrlName, reports: report_list },
      },
      communicationErrorAction: errorAction,
    });
  } catch (error) {
    log.error(error, errorDescription);
    yield put(errorAction);
  }
}

export default [takeEvery("RESOURCE.PRIMITIVE.CREATE", resourceCreateSaga)];
