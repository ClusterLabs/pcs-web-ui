import {libClusterStonithAgentDescribeAgent} from "app/backend";
import type {Action, ActionMap} from "app/store/actions";
import * as selectors from "app/store/selectors";

import {
  type api,
  authSafe,
  lib,
  log,
  processError,
  put,
  putTaskFailed,
  select,
} from "./common";

export function* load({
  key,
  payload: {agentName},
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
    payload: {agentName},
  };

  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () => put(errorAction),
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
    // TODO: Notify user + console log
    yield put(errorAction);
    return;
  }

  yield put({
    type: "FENCE_AGENT.LOAD.SUCCESS",
    key,
    payload: {apiAgentMetadata: payload.data},
  });
}

type PcmkAgent = selectors.ExtractClusterSelector<
  typeof selectors.getPcmkAgent
>;
export function* ensure({
  key,
  payload: {agentName},
}: ActionMap["FENCE_AGENT.ENSURE"]) {
  const pcmkAgent: PcmkAgent = yield select(
    selectors.getPcmkAgent(key.clusterName, agentName),
  );
  if (!pcmkAgent || pcmkAgent.loadStatus === "FAILED") {
    yield put({
      type: "FENCE_AGENT.LOAD",
      key,
      payload: {agentName},
    });
  }
}
