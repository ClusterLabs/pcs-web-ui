import { Action, PrimitiveResourceActions } from "app/store/actions";

import { api, lib, processError, put, race, take, takeEvery } from "./common";

function* resourceCreateSaga({
  payload: { agentName, resourceName, instanceAttrs, clusterUrlName, disabled },
}: PrimitiveResourceActions["CreateResource"]) {
  const { result }: { result: api.ResultOf<typeof api.lib.call> } = yield race({
    result: api.authSafe(api.lib.callCluster, {
      clusterUrlName,
      command: "resource-create",
      payload: {
        resource_id: resourceName,
        resource_agent_name: agentName,
        instance_attributes: instanceAttrs,
        ensure_disabled: disabled,
        operation_list: [],
        meta_attributes: {},
      },
    }),
    cancel: take("RESOURCE.PRIMITIVE.CREATE.CLOSE"),
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

  yield lib.clusterResponseSwitch(clusterUrlName, taskLabel, result.payload, {
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
