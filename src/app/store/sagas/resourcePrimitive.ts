import { call, put, takeEvery } from "redux-saga/effects";

import {
  Action,
  PrimitiveResourceActions,
  actionType,
} from "app/store/actions";
import { ApiResult, updateResource } from "app/backend";
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
        `backend error :\nstdout: ${result.response.stdout}\nstderr: ${result.response.stderr}`,
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
  takeEvery(
    actionType("RESOURCE.PRIMITIVE.UPDATE_INSTANCE_ATTRIBUTES"),
    updateInstanceAttributes,
  ),
];
