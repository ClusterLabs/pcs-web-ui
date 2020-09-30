import { api, getAvailResourceAgents } from "app/backend";
import { ResourceAgentListActions } from "app/store/actions";

import { put, takeEvery } from "./effects";
import { callAuthSafe } from "./authSafe";
import { callError } from "./backendTools";

type ApiCallResult = api.ResultOf<typeof getAvailResourceAgents>;
function* loadResourceAgentList({
  payload: { clusterUrlName },
}: ResourceAgentListActions["LoadResourceAgentList"]) {
  const result: ApiCallResult = yield callAuthSafe(
    getAvailResourceAgents,
    clusterUrlName,
  );

  const taskLabel = "load resource agent list";
  if (result.type !== "OK") {
    yield callError(result, taskLabel, {
      action: () =>
        put({
          type: "RESOURCE_AGENT_LIST.LOAD.FAILED",
          payload: { clusterUrlName },
        }),
      useNotification: false,
    });
    return;
  }

  yield put({
    type: "RESOURCE_AGENT_LIST.LOAD.SUCCESS",
    payload: { apiResourceAgentMap: result.payload, clusterUrlName },
  });
}
export default [takeEvery("RESOURCE_AGENT_LIST.LOAD", loadResourceAgentList)];
