import { call, put, takeEvery } from "redux-saga/effects";

import {
  Action,
  PrimitiveResourceActions,
  actionType,
} from "app/store/actions";
import { ApiResult, resourceCreate, updateResource } from "app/backend";
import { putNotification } from "./notifications";

import { authSafe } from "./authSafe";

function* updateInstanceAttributesFailed(resourceId: string, message: string) {
  yield put<Action>({
    type: "RESOURCE.PRIMITIVE.UPDATE_INSTANCE_ATTRIBUTES.FAILED",
  });
  yield putNotification(
    "ERROR",
    `Update instance attributes of resource "${resourceId}" failed:\n ${message}`,
  );
}

function* createResourceFailed({
  clusterUrlName,
  resourceName,
  message,
}: {
  clusterUrlName: string;
  resourceName: string;
  message: string;
}) {
  yield put<Action>({
    type: "RESOURCE.PRIMITIVE.CREATE.FAILED",
    payload: { clusterUrlName, resourceName },
  });
  yield putNotification(
    "ERROR",
    `Creation of resource "${resourceName}" failed:\n ${message}`,
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
      const { stdout, stderr } = result.response;
      yield updateInstanceAttributesFailed(
        resourceId,
        `backend error :\nstdout: ${stdout}\nstderr: ${stderr}`,
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

function* resourceCreateSaga({
  payload: { agentName, resourceName, clusterUrlName },
}: PrimitiveResourceActions["CreateResource"]) {
  yield putNotification(
    "INFO",
    `Creation of resource "${resourceName}" requested`,
  );
  try {
    const result: ApiResult<typeof resourceCreate> = yield call(
      authSafe(resourceCreate),
      {
        clusterUrlName,
        resourceName,
        agentName,
      },
    );
    if (!result.valid) {
      /* eslint-disable no-console */
      console.error(
        "Invalid library response from backend. Errors:",
        result.errors,
      );
      yield createResourceFailed({
        clusterUrlName,
        resourceName,
        message: `invalid backend response:\n${result.raw}`,
      });
      return;
    }

    if (result.response.status !== "success") {
      yield createResourceFailed({
        clusterUrlName,
        resourceName,
        message: result.response.status_msg || "",
      });
      return;
    }

    yield put<Action>({
      type: "RESOURCE.PRIMITIVE.CREATE.SUCCESS",
      payload: { clusterUrlName, resourceName },
    });
    yield putNotification(
      "SUCCESS",
      `Resource "${resourceName}" succesfully created`,
    );
  } catch (error) {
    yield createResourceFailed({
      clusterUrlName,
      resourceName,
      message: error.message,
    });
  }
}

export default [
  takeEvery(
    actionType("RESOURCE.PRIMITIVE.UPDATE_INSTANCE_ATTRIBUTES"),
    updateInstanceAttributes,
  ),
  takeEvery(actionType("RESOURCE.PRIMITIVE.CREATE"), resourceCreateSaga),
];
