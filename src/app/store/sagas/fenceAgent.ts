import { ApiResult, getFenceAgentMetadata } from "app/backend";
import { FenceAgentActions } from "app/store/actions";

import { call, put, takeEvery } from "./effects";
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
    yield put({
      type: "FENCE_AGENT.LOAD.FAILED",
      payload: { agentName, clusterUrlName },
    });
    // TODO display information about this in notifications
    return;
  }

  yield put({
    type: "FENCE_AGENT.LOAD.SUCCESS",
    payload: { apiAgentMetadata: result.response, clusterUrlName },
  });
}
export default [takeEvery("FENCE_AGENT.LOAD", loadFenceAgent)];
