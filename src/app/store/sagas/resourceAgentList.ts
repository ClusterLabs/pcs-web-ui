import { getAvailResourceAgents } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, processError, put, takeEvery } from "./common";

type ApiCallResult = api.ResultOf<typeof getAvailResourceAgents>;
function* loadResourceAgentList({ id }: ActionMap["RESOURCE_AGENT.LIST.LOAD"]) {
  const result: ApiCallResult = yield api.authSafe(
    getAvailResourceAgents,
    id.cluster,
  );

  const taskLabel = "load resource agent list";
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () =>
        put({
          type: "RESOURCE_AGENT.LIST.LOAD.FAIL",
          id,
        }),
      useNotification: false,
    });
    return;
  }

  yield put({
    type: "RESOURCE_AGENT.LIST.LOAD.OK",
    id,
    payload: { apiResourceAgentMap: result.payload },
  });
}
export default [takeEvery("RESOURCE_AGENT.LIST.LOAD", loadResourceAgentList)];
