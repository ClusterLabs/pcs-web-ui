import { getAvailResourceAgents } from "app/backend";
import { ResourceAgentListActions } from "app/store/actions";

import { api, processError, put, takeEvery } from "./common";

type ApiCallResult = api.ResultOf<typeof getAvailResourceAgents>;
function* loadResourceAgentList({
  payload: { clusterUrlName },
}: ResourceAgentListActions["LoadResourceAgentList"]) {
  const result: ApiCallResult = yield api.authSafe(
    getAvailResourceAgents,
    clusterUrlName,
  );

  const taskLabel = "load resource agent list";
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
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
