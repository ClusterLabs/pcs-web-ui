import {libClusterStonithAgentListAgents} from "app/backend";
import type {Action, ActionMap} from "app/store/actions";

import {api, lib, log, processError, put, putTaskFailed} from "./common";

type ApiCallResult = api.ResultOf<typeof libClusterStonithAgentListAgents>;
export function* load({key}: ActionMap["FENCE_AGENT.LIST.LOAD"]) {
  const result: ApiCallResult = yield api.authSafe(
    libClusterStonithAgentListAgents,
    {clusterName: key.clusterName},
  );

  const errorAction: Action = {
    type: "FENCE_AGENT.LIST.LOAD.FAIL",
    key,
  };

  const taskLabel = "load fence agent list";
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
    type: "FENCE_AGENT.LIST.LOAD.OK",
    key,
    payload: {apiFenceAgentList: payload.data},
  });
}
