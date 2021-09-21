import { libClusterStonithAgentDescribeAgent } from "app/backend";
import { Action, ActionMap } from "app/store/actions";

import {
  api,
  authSafe,
  lib,
  log,
  processError,
  put,
  putTaskFailed,
} from "./common";

export function* load({
  key,
  payload: { agentName },
}: ActionMap["FENCE_AGENT.LOAD"]) {
  const result: api.ResultOf<typeof libClusterStonithAgentDescribeAgent> =
    yield authSafe(libClusterStonithAgentDescribeAgent, {
      clusterName: key.clusterName,
      agentName,
    });

  const taskLabel = `load fence agent ${agentName}`;

  const errorAction: Action = {
    type: "FENCE_AGENT.LOAD.FAILED",
    key,
    payload: { agentName },
  };

  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () => put(errorAction),
    });
    return;
  }

  const { payload } = result;

  if (lib.isCommunicationError(payload)) {
    log.libInputError(payload.status, payload.status_msg, taskLabel);
    yield putTaskFailed(taskLabel, payload.status_msg);
    yield put(errorAction);
    return;
  }

  if (payload.status === "error") {
    // TODO: Notify user + console log
    yield put(errorAction);
    return;
  }

  yield put({
    type: "FENCE_AGENT.LOAD.SUCCESS",
    key,
    payload: { apiAgentMetadata: payload.data },
  });
}
