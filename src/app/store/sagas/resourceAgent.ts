import { ApiResult, getResourceAgentMetadata } from "app/backend";
import { ResourceAgentActions } from "app/store/actions";

import { call, put, takeEvery } from "./effects";
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
    yield put({
      type: "RESOURCE_AGENT.LOAD.FAILED",
      payload: { agentName, clusterUrlName },
    });
    // TODO display information about this in notifications
    return;
  }

  yield put({
    type: "RESOURCE_AGENT.LOAD.SUCCESS",
    payload: { apiAgentMetadata: result.response, clusterUrlName },
  });
}

export default [takeEvery("RESOURCE_AGENT.LOAD", loadResourceAgent)];
