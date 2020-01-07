import {
  call,
  takeEvery,
  put,
} from "redux-saga/effects";

import { Action, actionType, PrimitiveResourceActions } from "app/actions";
import {
  getResourceAgentMetadata,
  updateResource,
  ApiResult,
} from "app/backend";
import { putNotification } from "./notifications";

import { authSafe } from "./authSafe";

function* loadResourceAgent({
  payload: { agentName, clusterUrlName },
}: PrimitiveResourceActions["LoadResourceAgent"]) {
  const result: ApiResult<typeof getResourceAgentMetadata> = yield call(
    authSafe(getResourceAgentMetadata),
    clusterUrlName,
    agentName,
  );

  if (!result.valid) {
    yield put<Action>({
      type: "RESOURCE_AGENT.LOAD.FAILED",
      payload: { agentName },
    });
    // TODO display information about this in notifications
    return;
  }

  yield put<Action>({
    type: "RESOURCE_AGENT.LOAD.SUCCESS",
    payload: { apiAgentMetadata: result.response },
  });
}

function* updateInstanceAttributes({
  payload: { resourceId, attributes, clusterUrlName },
}: PrimitiveResourceActions["UpdateInstanceAttributes"]) {
  yield putNotification(
    "INFO",
    `Update instance attributes of resource "${resourceId}" requested`,
  );
  try {
    yield call(
      authSafe(updateResource),
      clusterUrlName,
      resourceId,
      attributes,
    );
    yield put<Action>({
      type: "RESOURCE.PRIMITIVE.UPDATE_INSTANCE_ATTRIBUTES.SUCCESS",
    });
  } catch (error) {
    yield putNotification(
      "ERROR",
      `Cannot update instance attributes of resource "${resourceId}": ${
        error.message
      }`,
    );
  }
}

export default [
  takeEvery(actionType("RESOURCE_AGENT.LOAD"), loadResourceAgent),
  takeEvery(
    actionType("RESOURCE.PRIMITIVE.UPDATE_INSTANCE_ATTRIBUTES"),
    updateInstanceAttributes,
  ),
];
