import { getAvailResourceAgents } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, processError, put, takeEvery } from "./common";

type ApiCallResult = api.ResultOf<typeof getAvailResourceAgents>;
function* loadResourceAgentList({
  payload: { clusterUrlName },
}: ActionMap["RESOURCE_AGENT.LIST.LOAD"]) {
  const result: ApiCallResult = yield api.authSafe(
    getAvailResourceAgents,
    clusterUrlName,
  );

  const taskLabel = "load resource agent list";
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () =>
        put({
          type: "RESOURCE_AGENT.LIST.LOAD.FAIL",
          payload: { clusterUrlName },
        }),
      useNotification: false,
    });
    return;
  }

  yield put({
    type: "RESOURCE_AGENT.LIST.LOAD.OK",
    payload: { apiResourceAgentMap: result.payload, clusterUrlName },
  });
}
export default [takeEvery("RESOURCE_AGENT.LIST.LOAD", loadResourceAgentList)];
