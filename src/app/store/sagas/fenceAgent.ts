import { getFenceAgentMetadata } from "app/backend";
import { FenceAgentActions } from "app/store/actions";

import { api, authSafe, processError, put, takeEvery } from "./common";

function* loadFenceAgent({
  payload: { agentName, clusterUrlName },
}: FenceAgentActions["LoadFenceAgent"]) {
  const result: api.ResultOf<typeof getFenceAgentMetadata> = yield authSafe(
    getFenceAgentMetadata,
    clusterUrlName,
    agentName,
  );

  const taskLabel = `load fence agent ${agentName}`;
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
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
