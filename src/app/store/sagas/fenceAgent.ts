import { getFenceAgentMetadata } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, authSafe, processError, put, takeEvery } from "./common";

function* loadFenceAgent({
  key,
  payload: { agentName },
}: ActionMap["FENCE_AGENT.LOAD"]) {
  const result: api.ResultOf<typeof getFenceAgentMetadata> = yield authSafe(
    getFenceAgentMetadata,
    key.clusterName,
    agentName,
  );

  const taskLabel = `load fence agent ${agentName}`;
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () =>
        put({
          type: "FENCE_AGENT.LOAD.FAILED",
          key,
          payload: { agentName },
        }),
    });
    return;
  }

  yield put({
    type: "FENCE_AGENT.LOAD.SUCCESS",
    key,
    payload: { apiAgentMetadata: result.payload },
  });
}
export default [takeEvery("FENCE_AGENT.LOAD", loadFenceAgent)];
