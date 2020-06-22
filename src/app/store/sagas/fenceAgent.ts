import { call, put, takeEvery } from "redux-saga/effects";

import { Action, FenceAgentActions, actionType } from "app/actions";
import { ApiResult, getFenceAgentMetadata } from "app/backend";

import { authSafe } from "./authSafe";

function* loadFenceAgent({
  payload: { agentName, clusterUrlName },
}: FenceAgentActions["LoadFenceAgent"]) {
  const result: ApiResult<typeof getFenceAgentMetadata> = yield call(
    authSafe(getFenceAgentMetadata),
    clusterUrlName,
    agentName,
  );

  if (!result.valid) {
    yield put<Action>({
      type: "FENCE_AGENT.LOAD.FAILED",
      payload: { agentName },
    });
    // TODO display information about this in notifications
    return;
  }

  yield put<Action>({
    type: "FENCE_AGENT.LOAD.SUCCESS",
    payload: { apiAgentMetadata: result.response },
  });
}
export default [takeEvery(actionType("FENCE_AGENT.LOAD"), loadFenceAgent)];
