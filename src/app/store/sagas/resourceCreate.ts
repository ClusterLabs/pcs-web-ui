import { Action, PrimitiveResourceActions } from "app/store/actions";
import { api, resourceCreate } from "app/backend";

import { put, race, take, takeEvery } from "./effects";
import { callAuthSafe } from "./authSafe";
import { libraryResponseSwitch } from "./lib";
import { callError } from "./backendTools";

function* resourceCreateSaga({
  payload: { agentName, resourceName, instanceAttrs, clusterUrlName, disabled },
}: PrimitiveResourceActions["CreateResource"]) {
  const {
    result,
  }: { result: api.ResultOf<typeof resourceCreate> } = yield race({
    result: callAuthSafe(resourceCreate, {
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
    yield callError(result, taskLabel, {
      action: () => put(errorAction),
      useNotification: false,
    });
    return;
  }

  yield libraryResponseSwitch({
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
