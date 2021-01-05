import { getResourceAgentMetadata } from "app/backend";
import { ActionMap, selectors, types } from "app/store";

import { api, processError, put, select, takeEvery } from "./common";

type ApiCallResult = api.ResultOf<typeof getResourceAgentMetadata>;

function* loadResourceAgent({
  id,
  payload: { agentName },
}: ActionMap["RESOURCE_AGENT.LOAD"]) {
  const result: ApiCallResult = yield api.authSafe(
    getResourceAgentMetadata,
    id.cluster,
    agentName,
  );

  const taskLabel = `load resource agent ${agentName}`;
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () =>
        put({
          type: "RESOURCE_AGENT.LOAD.FAILED",
          id,
          payload: { agentName },
        }),
    });
    return;
  }

  yield put({
    type: "RESOURCE_AGENT.LOAD.SUCCESS",
    id,
    payload: { apiAgentMetadata: result.payload },
  });
}

function* ensureResourceAgent({
  id,
  payload: { agentName },
}: ActionMap["RESOURCE_AGENT.ENSURE"]) {
  const pcmkAgent: types.pcmkAgents.StoredAgent = yield select(
    selectors.getPcmkAgent(id.cluster, agentName),
  );
  if (!pcmkAgent || pcmkAgent.loadStatus === "FAILED") {
    yield put({
      type: "RESOURCE_AGENT.LOAD",
      id,
      payload: { agentName },
    });
  }
}

export default [
  takeEvery("RESOURCE_AGENT.LOAD", loadResourceAgent),
  takeEvery("RESOURCE_AGENT.ENSURE", ensureResourceAgent),
];
