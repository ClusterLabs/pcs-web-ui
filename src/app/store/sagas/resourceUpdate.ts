import { PrimitiveResourceActions } from "app/store/actions";
import { ApiResult, updateResource } from "app/backend";

import { call, put, takeEvery } from "./effects";
import { putNotification } from "./notifications";
import { authSafe } from "./authSafe";

function* updateInstanceAttributesFailed(resourceId: string, message: string) {
  yield put({
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
      const { stdout, stderr } = result.response;
      yield updateInstanceAttributesFailed(
        resourceId,
        `backend error :\nstdout: ${stdout}\nstderr: ${stderr}`,
      );
      return;
    }

    yield put({
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
    "RESOURCE.PRIMITIVE.UPDATE_INSTANCE_ATTRIBUTES",
    updateInstanceAttributes,
  ),
];
