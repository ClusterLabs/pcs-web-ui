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

function* updateInstanceAttributesFailed(resourceId: string, message: string) {
  yield put<Action>({
    type: "RESOURCE.PRIMITIVE.UPDATE_INSTANCE_ATTRIBUTES.FAILED",
  });
  yield putNotification(
    "ERROR",
    `Update instance attributes of resource "${
      resourceId
    }" failed:\n ${message}`,

  );
}

function* updateInstanceAttributes({
  payload: { resourceId, attributes, clusterUrlName },
}: PrimitiveResourceActions["UpdateInstanceAttributes"]) {
  yield putNotification(
    "INFO",
    `Update instance attributes of resource "${resourceId}" requested`,
  );
  try {
    const result: ApiResult<typeof updateResource> = yield call(
      authSafe(updateResource),
      clusterUrlName,
      resourceId,
      attributes,
    );
    if (!result.valid) {
      yield updateInstanceAttributesFailed(
        resourceId,
        `invalid backend response:\n${result.raw}`,
      );
      return;
    }

    if (result.response.error === "true") {
      yield updateInstanceAttributesFailed(
        resourceId,
        `backend error :\nstdout: ${result.response.stdout}\nstderr: ${
          result.response.stderr
        }`,
      );
      return;
    }

    yield put<Action>({
      type: "RESOURCE.PRIMITIVE.UPDATE_INSTANCE_ATTRIBUTES.SUCCESS",
    });
    yield putNotification(
      "SUCCESS",
      `Instance attributes of resource "${resourceId}" succesfully updated`,
    );
  } catch (error) {
    yield updateInstanceAttributesFailed(resourceId, error.message);
  }
}

export default [
  takeEvery(actionType("RESOURCE_AGENT.LOAD"), loadResourceAgent),
  takeEvery(
    actionType("RESOURCE.PRIMITIVE.UPDATE_INSTANCE_ATTRIBUTES"),
    updateInstanceAttributes,
  ),
];
