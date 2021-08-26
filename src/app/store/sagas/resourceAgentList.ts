import { libClusterResourceAgentListAgents } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, processError, put } from "./common";

type ApiCallResult = api.ResultOf<typeof libClusterResourceAgentListAgents>;
export function* load({ key }: ActionMap["RESOURCE_AGENT.LIST.LOAD"]) {
  const result: ApiCallResult = yield api.authSafe(
    libClusterResourceAgentListAgents,
    { clusterName: key.clusterName },
  );

  const taskLabel = "load resource agent list";
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () =>
        put({
          type: "RESOURCE_AGENT.LIST.LOAD.FAIL",
          key,
        }),
      useNotification: false,
    });
    return;
  }

  yield put({
    type: "RESOURCE_AGENT.LIST.LOAD.OK",
    key,
    payload: { apiResourceAgentList: result.payload.data },
  });
}
