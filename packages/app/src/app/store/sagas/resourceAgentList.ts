import {libClusterResourceAgentListAgents} from "app/backend";
import type {Action, ActionMap} from "app/store/actions";

import {api, lib, log, processError, put, putTaskFailed} from "./common";

type ApiCallResult = api.ResultOf<typeof libClusterResourceAgentListAgents>;
export function* load({key}: ActionMap["RESOURCE_AGENT.LIST.LOAD"]) {
  const result: ApiCallResult = yield api.authSafe(
    libClusterResourceAgentListAgents,
    {clusterName: key.clusterName},
  );

  const errorAction: Action = {
    type: "RESOURCE_AGENT.LIST.LOAD.FAIL",
    key,
  };

  const taskLabel = "load resource agent list";
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () => put(errorAction),
      useNotification: false,
    });
    return;
  }

  const {payload} = result;

  if (lib.isCommunicationError(payload)) {
    log.libInputError(payload.status, payload.status_msg, taskLabel);
    yield putTaskFailed(taskLabel, payload.status_msg);
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
    key,
    payload: {apiResourceAgentList: payload.data},
  });
}
