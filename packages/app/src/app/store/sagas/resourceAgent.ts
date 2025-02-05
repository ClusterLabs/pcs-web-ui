import {libClusterResourceAgentDescribeAgent} from "app/backend";
import * as selectors from "app/store/selectors";
import type {Action, ActionMap} from "app/store/actions";

import {
  api,
  lib,
  log,
  processError,
  put,
  putTaskFailed,
  select,
} from "./common";

type ApiCallResult = api.ResultOf<typeof libClusterResourceAgentDescribeAgent>;

export function* load({
  key,
  payload: {agentName},
}: ActionMap["RESOURCE_AGENT.LOAD"]) {
  const result: ApiCallResult = yield api.authSafe(
    libClusterResourceAgentDescribeAgent,
    {clusterName: key.clusterName, agentName},
  );

  const taskLabel = `load resource agent ${agentName}`;

  const errorAction: Action = {
    type: "RESOURCE_AGENT.LOAD.FAILED",
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
    yield put(errorAction);
    return;
  }

  yield put({
    type: "RESOURCE_AGENT.LOAD.SUCCESS",
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
}: ActionMap["RESOURCE_AGENT.ENSURE"]) {
  const pcmkAgent: PcmkAgent = yield select(
    selectors.getPcmkAgent(key.clusterName, agentName),
  );
  if (!pcmkAgent || pcmkAgent.loadStatus === "FAILED") {
    yield put({
      type: "RESOURCE_AGENT.LOAD",
      key,
      payload: {agentName},
    });
  }
}
