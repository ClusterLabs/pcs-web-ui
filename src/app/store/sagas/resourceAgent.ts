import { call, put, takeEvery } from "redux-saga/effects";

import { Action, ResourceAgentActions, actionType } from "app/actions";
import { ApiResult, getResourceAgentMetadata } from "app/backend";

import { authSafe } from "./authSafe";

function* loadResourceAgent({
  payload: { agentName, clusterUrlName },
}: ResourceAgentActions["LoadResourceAgent"]) {
  const result: ApiResult<typeof getResourceAgentMetadata> = yield call(
    authSafe(getResourceAgentMetadata),
    clusterUrlName,
    agentName,
  );

  if (!result.valid) {
    yield put<Action>({
      type: "RESOURCE_AGENT.LOAD.FAILED",
      payload: { agentName, clusterUrlName },
    });
    // TODO display information about this in notifications
    return;
  }

  yield put<Action>({
    type: "RESOURCE_AGENT.LOAD.SUCCESS",
    payload: { apiAgentMetadata: result.response, clusterUrlName },
  });
}

export default [
  takeEvery(actionType("RESOURCE_AGENT.LOAD"), loadResourceAgent),
];
