import { libClusterStonithAgentDescribeAgent } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, authSafe, processError, put } from "./common";

export function* load({
  key,
  payload: { agentName },
}: ActionMap["FENCE_AGENT.LOAD"]) {
  const result: api.ResultOf<typeof libClusterStonithAgentDescribeAgent> =
    yield authSafe(libClusterStonithAgentDescribeAgent, {
      clusterName: key.clusterName,
      agentName,
    });

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
    payload: { apiAgentMetadata: result.payload.data },
  });
}
