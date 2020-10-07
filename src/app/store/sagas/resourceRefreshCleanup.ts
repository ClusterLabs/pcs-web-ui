import { PrimitiveResourceActions } from "app/store/actions";
import { resourceCleanup, resourceRefresh } from "app/backend";

import {
  api,
  clusterSuccess,
  processError,
  putNotification,
  takeEvery,
} from "./common";

type Action =
  | PrimitiveResourceActions["ActionRefresh"]
  | PrimitiveResourceActions["ActionCleanup"];

type ApiCall = typeof resourceRefresh | typeof resourceCleanup;

function resourceAction(apiCall: ApiCall, taskName: string) {
  return function* resourceActionSaga({
    payload: { resourceId, clusterUrlName },
  }: Action) {
    const result: api.ResultOf<typeof resourceRefresh> = yield api.authSafe(
      apiCall,
      clusterUrlName,
      resourceId,
    );
    const taskLabel = `${taskName} resource "${resourceId}"`;
    if (result.type !== "OK") {
      yield processError(result, taskLabel);
      return;
    }

    if ("error" in result.payload) {
      const { stdout, stderror } = result.payload;
      yield putNotification("ERROR", `Task failed: ${taskLabel}`, {
        type: "LINES",
        lines: ["backend error :", `stdout: ${stdout}`, `stderr: ${stderror}`],
      });
      return;
    }

    yield clusterSuccess(clusterUrlName, taskLabel);
  };
}

export default [
  takeEvery(
    "RESOURCE.PRIMITIVE.REFRESH",
    resourceAction(resourceRefresh, "refresh"),
  ),
  takeEvery(
    "RESOURCE.PRIMITIVE.CLEANUP",
    resourceAction(resourceCleanup, "cleanup"),
  ),
];
