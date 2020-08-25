import { ApiResult, getResourceAgentMetadata } from "app/backend";
import { actions, selectors, types } from "app/store";

import { call, put, select, takeEvery } from "./effects";
import { authSafe } from "./authSafe";

function* loadResourceAgent({
  payload: { agentName, clusterUrlName },
}: actions.ResourceAgentActions["LoadResourceAgent"]) {
  const result: ApiResult<typeof getResourceAgentMetadata> = yield call(
    authSafe(getResourceAgentMetadata),
    clusterUrlName,
    agentName,
  );

  if (!result.valid) {
    yield put({
      type: "RESOURCE_AGENT.LOAD.FAILED",
      payload: { agentName, clusterUrlName },
    });
    // TODO display information about this in notifications
    return;
  }

  yield put({
    type: "RESOURCE_AGENT.LOAD.SUCCESS",
    payload: { apiAgentMetadata: result.response, clusterUrlName },
  });
}

function* ensureResourceAgent({
  payload: { agentName, clusterUrlName },
}: actions.ResourceAgentActions["EnsureResourceAgent"]) {
  const pcmkAgent: types.pcmkAgents.StoredAgent = yield select(
    selectors.getPcmkAgent(clusterUrlName, agentName),
  );
  if (!pcmkAgent || pcmkAgent.loadStatus === "FAILED") {
    yield put({
      type: "RESOURCE_AGENT.LOAD",
      payload: {
        agentName,
        clusterUrlName,
      },
    });
  }
}

export default [
  takeEvery("RESOURCE_AGENT.LOAD", loadResourceAgent),
  takeEvery("RESOURCE_AGENT.ENSURE", ensureResourceAgent),
];
