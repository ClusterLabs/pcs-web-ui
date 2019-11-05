import {
  call,
  takeEvery,
  put,
} from "redux-saga/effects";

import { ApiAgentMetadata } from "app/common/backend/resourceAgentMetadata";
import * as auth from "app/services/auth/sagas";
import { typeIs } from "app/common/utils";

import * as ResourcePrimitiveAction from "./actions";


function* loadResourceAgent(
  {
    payload: { agentName, clusterUrlName },
  }: ResourcePrimitiveAction.LoadResourceAgent,
) {
  const apiAgentMetadata: ApiAgentMetadata = yield call(
    auth.getJson,
    `/managec/${clusterUrlName}/get_resource_agent_metadata`,
    [["agent", agentName]],
  );

  if (apiAgentMetadata.name !== agentName) {
    yield put<ResourcePrimitiveAction.LoadResourceAgentFailed>({
      type: "RESOURCE_AGENT.LOAD.FAILED",
      payload: { agentName },
    });

    return;
  }

  yield put<ResourcePrimitiveAction.LoadResourceAgentSuccess>({
    type: "RESOURCE_AGENT.LOAD.SUCCESS",
    payload: { apiAgentMetadata },
  });
}

export default [
  takeEvery(
    typeIs<ResourcePrimitiveAction.LoadResourceAgent["type"]>(
      "RESOURCE_AGENT.LOAD",
    ),
    loadResourceAgent,
  ),
];
