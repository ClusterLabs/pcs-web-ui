import { PrimitiveResourceActions } from "app/store/actions";
import { ApiResult, log, resourceDisable } from "app/backend";

import { call, put, takeEvery } from "./effects";
import { authSafe } from "./authSafe";
import { putNotification } from "./notifications";

function* resourceDisableSaga({
  payload: { resourceNameList, clusterUrlName },
}: PrimitiveResourceActions["ActionDisable"]) {
  const resourcesInMsg =
    resourceNameList.length === 1
      ? `resource "${resourceNameList[0]}"`
      : `resources ${resourceNameList.map(r => `"${r}"`).join(", ")}`;

  const errorDescription = `Communication error while unmanaging ${resourcesInMsg}`;
  try {
    const result: ApiResult<typeof resourceDisable> = yield call(
      authSafe(resourceDisable),
      {
        clusterUrlName,
        resourceNameList,
      },
    );

    if (!result.valid) {
      log.invalidResponse(result, errorDescription);
      yield putNotification(
        "ERROR",
        `${errorDescription}. Details in the browser console`,
      );
      return;
    }

    const {
      /* eslint-disable-next-line camelcase */
      response: { status, status_msg, report_list },
    } = result;

    const reportList = report_list.map(
      r => `${r.severity.level}: ${r.message.message}`,
    );

    switch (status) {
      case "input_error":
      case "exception":
      case "unknown_cmd":
        log.libInputError(status, status_msg, errorDescription);
        yield putNotification(
          "ERROR",
          `${errorDescription}. Details in the browser console`,
        );
        return;
      case "error":
        yield putNotification(
          "ERROR",
          `Error during disable ${resourcesInMsg}`,
          {
            type: "LIST",
            title: "Messages from the backend",
            items: reportList,
          },
        );
        return;
      case "success":
        yield put({
          type: "CLUSTER_DATA.REFRESH",
          payload: { clusterUrlName },
        });
        yield putNotification(
          "SUCCESS",
          `Succesfully disabled ${resourcesInMsg}`,
          {
            type: "LIST",
            title: "Messages from the backend",
            items: reportList,
          },
        );
        return;
      default: {
        const _exhaustiveCheck: never = status;
        throw new Error(`Status with value "${_exhaustiveCheck}" not expected`);
      }
    }
  } catch (error) {
    log.error(error, errorDescription);
    yield putNotification(
      "ERROR",
      `${errorDescription}. Details in the browser console`,
    );
  }
}

export default [takeEvery("RESOURCE.PRIMITIVE.DISABLE", resourceDisableSaga)];
