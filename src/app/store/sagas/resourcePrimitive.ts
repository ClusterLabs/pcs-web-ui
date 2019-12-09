import {
  call,
  takeEvery,
  put,
} from "redux-saga/effects";

import { Action, actionType, PrimitiveResourceActions } from "app/actions";
import {
  getResourceAgentMetadata,
  ApiResult,
} from "app/backend";

import { authSafe } from "./authSafe";

function* loadResourceAgent({
  payload: { agentName, clusterUrlName },
}: PrimitiveResourceActions["LoadResourceAgent"]) {
  const result: ApiResult<typeof getResourceAgentMetadata> = yield call(
    authSafe(getResourceAgentMetadata),
    clusterUrlName,
    agentName,
  );

  if (!result.valid) {
    yield put<Action>({
      type: "RESOURCE_AGENT.LOAD.FAILED",
      payload: { agentName },
    });
    // TODO display information about this in notifications
    return;
  }

  yield put<Action>({
    type: "RESOURCE_AGENT.LOAD.SUCCESS",
    payload: { apiAgentMetadata: result.response },
  });
}

export default [
  takeEvery(actionType("RESOURCE_AGENT.LOAD"), loadResourceAgent),
];
