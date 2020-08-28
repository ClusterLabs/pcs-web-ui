import { PrimitiveResourceActions } from "app/store/actions";
import { ApiResult, resourceCreate } from "app/backend";

import { call, put, race, take, takeEvery } from "./effects";
import { putNotification } from "./notifications";
import { authSafe } from "./authSafe";

function* createResourceFailed({
  clusterUrlName,
  resourceName,
  message,
}: {
  clusterUrlName: string;
  resourceName: string;
  message: string;
}) {
  yield put({
    type: "RESOURCE.PRIMITIVE.CREATE.ERROR",
    payload: { clusterUrlName },
  });
  yield putNotification(
    "ERROR",
    `Creation of resource "${resourceName}" failed:\n ${message}`,
  );
}

function* resourceCreateSaga({
  payload: { agentName, resourceName, instanceAttrs, clusterUrlName },
}: PrimitiveResourceActions["CreateResource"]) {
  yield putNotification(
    "INFO",
    `Creation of resource "${resourceName}" requested`,
  );
  try {
    const {
      result,
    }: {
      result: ApiResult<typeof resourceCreate>;
    } = yield race({
      result: call(authSafe(resourceCreate), {
        clusterUrlName,
        resourceName,
        agentName,
        instanceAttrs,
      }),
      cancel: take("RESOURCE.PRIMITIVE.CREATE.CANCEL"),
    });
    if (!result) {
      return;
    }

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
      yield put({
        type: "RESOURCE.PRIMITIVE.CREATE.FAILED",
        payload: { clusterUrlName, reports: result.response.report_list },
      });
      yield createResourceFailed({
        clusterUrlName,
        resourceName,
        message: result.response.status_msg || "",
      });
      return;
    }

    yield put({
      type: "RESOURCE.PRIMITIVE.CREATE.SUCCESS",
      payload: { clusterUrlName, reports: result.response.report_list },
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

export default [takeEvery("RESOURCE.PRIMITIVE.CREATE", resourceCreateSaga)];
