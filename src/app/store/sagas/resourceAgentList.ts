import { call, put, takeEvery } from "redux-saga/effects";

import { ApiResult, getResourceAgentList } from "app/backend";
import {
  Action,
  ResourceAgentListActions,
  actionType,
} from "app/store/actions";

import { authSafe } from "./authSafe";

function* loadResourceAgentList({
  payload: { clusterUrlName },
}: ResourceAgentListActions["LoadResourceAgentList"]) {
  const result: ApiResult<typeof getResourceAgentList> = yield call(
    authSafe(getResourceAgentList),
    clusterUrlName,
  );

  if (!result.valid) {
    yield put<Action>({
      type: "RESOURCE_AGENT_LIST.LOAD.FAILED",
      payload: { clusterUrlName },
    });
    // TODO display information about this in notifications
    return;
  }

  yield put<Action>({
    type: "RESOURCE_AGENT_LIST.LOAD.SUCCESS",
    payload: { apiResourceAgentList: result.response, clusterUrlName },
  });
}
export default [
  takeEvery(actionType("RESOURCE_AGENT_LIST.LOAD"), loadResourceAgentList),
];
