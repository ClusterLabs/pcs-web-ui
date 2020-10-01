import { getResourceAgentMetadata } from "app/backend";
import { actions, selectors, types } from "app/store";

import { api, processError, put, select, takeEvery } from "./common";

type ApiCallResult = api.ResultOf<typeof getResourceAgentMetadata>;

function* loadResourceAgent({
  payload: { agentName, clusterUrlName },
}: actions.ResourceAgentActions["LoadResourceAgent"]) {
  const result: ApiCallResult = yield api.authSafe(
    getResourceAgentMetadata,
    clusterUrlName,
    agentName,
  );

  const taskLabel = `load resource agent ${agentName}`;
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () =>
        put({
          type: "RESOURCE_AGENT.LOAD.FAILED",
          payload: { agentName, clusterUrlName },
        }),
    });
    return;
  }

  yield put({
    type: "RESOURCE_AGENT.LOAD.SUCCESS",
    payload: { apiAgentMetadata: result.payload, clusterUrlName },
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
