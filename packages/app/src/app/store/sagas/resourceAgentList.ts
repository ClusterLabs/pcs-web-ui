import {libClusterResourceAgentListAgents} from "app/backend";
import type {Action} from "app/store/actions";

import {
  api,
  lib,
  log,
  processError,
  put,
  putNotification,
  putTaskFailed,
} from "./common";
import {noClusterDetectedCase} from "./cluster";

type ApiCallResult = api.ResultOf<typeof libClusterResourceAgentListAgents>;
export function* load() {
  const result: ApiCallResult = yield api.authSafe(
    libClusterResourceAgentListAgents,
  );

  const errorAction: Action = {type: "RESOURCE_AGENT.LIST.LOAD.FAIL"};

  const taskLabel = "load resource agent list";
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () => put(errorAction),
      useNotification: !noClusterDetectedCase(result),
    });
    return;
  }

  const {payload} = result;

  if (lib.isCommandRejected(payload)) {
    log.libInputError(payload.status, payload.status_msg, taskLabel);
    if (payload.status === "permission_denied") {
      yield putNotification("ERROR", `Permission denied while: ${taskLabel}`);
    } else {
      yield putTaskFailed(taskLabel, payload.status_msg);
    }
    yield put(errorAction);
    return;
  }

  if (payload.status === "error") {
    // TODO: notify user
    yield put(errorAction);
    return;
  }

  yield put({
    type: "RESOURCE_AGENT.LIST.LOAD.OK",
    payload: {apiResourceAgentList: payload.data},
  });
}
