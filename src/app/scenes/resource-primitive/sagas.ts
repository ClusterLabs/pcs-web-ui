import {
  call,
  takeEvery,
  put,
} from "redux-saga/effects";

import {
  getResourceAgentMetadata,
  getResourceAgentMetadataResult,
} from "app/common/backend/getResourceAgentMetadata";
import { typeIs } from "app/common/utils";

import * as ResourcePrimitiveAction from "./actions";


function* loadResourceAgent(
  {
    payload: { agentName, clusterUrlName },
  }: ResourcePrimitiveAction.LoadResourceAgent,
) {
  const result: getResourceAgentMetadataResult = yield call(
    getResourceAgentMetadata,
    clusterUrlName,
    agentName,
  );

  if (result.errors) {
    yield put<ResourcePrimitiveAction.LoadResourceAgentFailed>({
      type: "RESOURCE_AGENT.LOAD.FAILED",
      payload: { agentName },
    });
    // TODO display information about this in notifications
    return;
  }

  yield put<ResourcePrimitiveAction.LoadResourceAgentSuccess>({
    type: "RESOURCE_AGENT.LOAD.SUCCESS",
    payload: { apiAgentMetadata: result.response },
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
