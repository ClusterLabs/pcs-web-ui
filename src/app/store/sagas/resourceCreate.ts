import { Action, ActionMap } from "app/store/actions";

import { api, lib, processError, put, race, take, takeEvery } from "./common";

function* resourceCreateSaga({
  id,
  payload: { agentName, resourceName, instanceAttrs, disabled },
}: ActionMap["RESOURCE.CREATE"]) {
  const { result }: { result: api.ResultOf<typeof api.lib.call> } = yield race({
    result: api.authSafe(api.lib.callCluster, {
      clusterUrlName: id.cluster,
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
    cancel: take("RESOURCE.CREATE.CLOSE"),
  });

  if (!result) {
    // cancelled; we no longer care about the fate of the call
    return;
  }

  const taskLabel = `create resource "${resourceName}"`;
  const errorAction: Action = {
    type: "RESOURCE.CREATE.ERROR",
    id,
  };

  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () => put(errorAction),
      useNotification: false,
    });
    return;
  }

  yield lib.clusterResponseSwitch(id.cluster, taskLabel, result.payload, {
    successAction: {
      type: "RESOURCE.CREATE.SUCCESS",
      id,
      payload: { reports: result.payload.report_list },
    },
    errorAction: {
      type: "RESOURCE.CREATE.FAIL",
      id,
      payload: { reports: result.payload.report_list },
    },
    communicationErrorAction: errorAction,
  });
}

export default [takeEvery("RESOURCE.CREATE", resourceCreateSaga)];
