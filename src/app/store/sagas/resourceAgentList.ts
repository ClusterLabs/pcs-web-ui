import { ApiResult, getAvailResourceAgents } from "app/backend";
import { ResourceAgentListActions } from "app/store/actions";

import { call, put, takeEvery } from "./effects";
import { authSafe } from "./authSafe";

function* loadResourceAgentList({
  payload: { clusterUrlName },
}: ResourceAgentListActions["LoadResourceAgentList"]) {
  const result: ApiResult<typeof getAvailResourceAgents> = yield call(
    authSafe(getAvailResourceAgents),
    clusterUrlName,
  );

  if (!result.valid) {
    yield put({
      type: "RESOURCE_AGENT_LIST.LOAD.FAILED",
      payload: { clusterUrlName },
    });
    // TODO display information about this in notifications
    return;
  }

  yield put({
    type: "RESOURCE_AGENT_LIST.LOAD.SUCCESS",
    payload: { apiResourceAgentMap: result.response, clusterUrlName },
  });
}
export default [takeEvery("RESOURCE_AGENT_LIST.LOAD", loadResourceAgentList)];
