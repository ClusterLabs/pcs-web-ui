import { Action, PrimitiveResourceActions } from "app/store/actions";
import { resourceCreate } from "app/backend";

import { api, lib, processError, put, race, take, takeEvery } from "./common";

function* resourceCreateSaga({
  payload: { agentName, resourceName, instanceAttrs, clusterUrlName, disabled },
}: PrimitiveResourceActions["CreateResource"]) {
  const {
    result,
  }: { result: api.ResultOf<typeof resourceCreate> } = yield race({
    result: api.authSafe(resourceCreate, {
      clusterUrlName,
      resourceName,
      agentName,
      instanceAttrs,
      disabled,
    }),
    cancel: take("RESOURCE.PRIMITIVE.CREATE.CANCEL"),
  });

  if (!result) {
    // cancelled; we no longer care about the fate of the call
    return;
  }

  const taskLabel = `create resource "${resourceName}"`;
  const errorAction: Action = {
    type: "RESOURCE.PRIMITIVE.CREATE.ERROR",
    payload: { clusterUrlName },
  };

  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () => put(errorAction),
      useNotification: false,
    });
    return;
  }

  yield lib.responseSwitch({
    clusterUrlName,
    response: result.payload,
    taskLabel,
    successAction: {
      type: "RESOURCE.PRIMITIVE.CREATE.SUCCESS",
      payload: { clusterUrlName, reports: result.payload.report_list },
    },
    errorAction: {
      type: "RESOURCE.PRIMITIVE.CREATE.FAILED",
      payload: { clusterUrlName, reports: result.payload.report_list },
    },
    communicationErrorAction: errorAction,
  });
}

export default [takeEvery("RESOURCE.PRIMITIVE.CREATE", resourceCreateSaga)];
