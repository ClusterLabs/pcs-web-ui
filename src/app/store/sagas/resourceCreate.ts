import { Action, PrimitiveResourceActions } from "app/store/actions";
import { ApiResult, log, resourceCreate } from "app/backend";

import { call, put, race, take, takeEvery } from "./effects";
import { authSafe } from "./authSafe";

function* resourceCreateSaga({
  payload: { agentName, resourceName, instanceAttrs, clusterUrlName },
}: PrimitiveResourceActions["CreateResource"]) {
  const errorAction: Action = {
    type: "RESOURCE.PRIMITIVE.CREATE.ERROR",
    payload: { clusterUrlName },
  };
  const errorDescription = `Communication error while creating the resource "${resourceName}"`;

  try {
    const { result }: { result: ApiResult<typeof resourceCreate> } = yield race(
      {
        result: call(authSafe(resourceCreate), {
          clusterUrlName,
          resourceName,
          agentName,
          instanceAttrs,
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

    const {
      /* eslint-disable-next-line camelcase */
      response: { status, status_msg, report_list },
    } = result;

    switch (status) {
      case "input_error":
      case "exception":
      case "unknown_cmd":
        log.libInputError(status, status_msg, errorDescription);
        yield put(errorAction);
        return;
      case "error":
        yield put({
          type: "RESOURCE.PRIMITIVE.CREATE.FAILED",
          payload: { clusterUrlName, reports: report_list },
        });
        return;
      case "success":
        yield put({
          type: "CLUSTER_DATA.REFRESH",
          payload: { clusterUrlName },
        });
        yield put({
          type: "RESOURCE.PRIMITIVE.CREATE.SUCCESS",
          payload: { clusterUrlName, reports: report_list },
        });
        return;
      default: {
        const _exhaustiveCheck: never = status;
        throw new Error(`Status with value "${_exhaustiveCheck}" not expected`);
      }
    }
  } catch (error) {
    log.error(
      error,
      `Communication error while creating the resource "${resourceName}"`,
    );
    yield put(errorAction);
  }
}

export default [takeEvery("RESOURCE.PRIMITIVE.CREATE", resourceCreateSaga)];
