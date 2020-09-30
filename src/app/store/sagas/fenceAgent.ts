import { api, getFenceAgentMetadata } from "app/backend";
import { FenceAgentActions } from "app/store/actions";

import { put, takeEvery } from "./effects";
import { callAuthSafe } from "./authSafe";
import { callError } from "./backendTools";

function* loadFenceAgent({
  payload: { agentName, clusterUrlName },
}: FenceAgentActions["LoadFenceAgent"]) {
  const result: api.ResultOf<typeof getFenceAgentMetadata> = yield callAuthSafe(
    getFenceAgentMetadata,
    clusterUrlName,
    agentName,
  );

  const taskLabel = `load fence agent ${agentName}`;
  if (result.type !== "OK") {
    yield callError(result, taskLabel, {
      action: () =>
        put({
          type: "FENCE_AGENT.LOAD.FAILED",
          payload: { agentName, clusterUrlName },
        }),
    });
    return;
  }

  yield put({
    type: "FENCE_AGENT.LOAD.SUCCESS",
    payload: { apiAgentMetadata: result.payload, clusterUrlName },
  });
}
export default [takeEvery("FENCE_AGENT.LOAD", loadFenceAgent)];
