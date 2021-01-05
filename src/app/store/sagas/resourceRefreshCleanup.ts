import { ActionMap } from "app/store/actions";
import { resourceCleanup, resourceRefresh } from "app/backend";

import {
  api,
  clusterSuccess,
  processError,
  putNotification,
  takeEvery,
} from "./common";

type Action = ActionMap["RESOURCE.REFRESH"] | ActionMap["RESOURCE.CLEANUP"];

type ApiCall = typeof resourceRefresh | typeof resourceCleanup;

function resourceAction(apiCall: ApiCall, taskName: string) {
  return function* resourceActionSaga({
    key,
    payload: { resourceId, resourceType },
  }: Action) {
    const result: api.ResultOf<typeof resourceRefresh> = yield api.authSafe(
      apiCall,
      key.clusterName,
      resourceId,
    );
    const taskLabel = `${taskName} ${
      resourceType === "resource" ? "resource" : "fence device"
    } "${resourceId}"`;
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

    yield clusterSuccess(key.clusterName, taskLabel);
  };
}

export default [
  takeEvery("RESOURCE.REFRESH", resourceAction(resourceRefresh, "refresh")),
  takeEvery("RESOURCE.CLEANUP", resourceAction(resourceCleanup, "cleanup")),
];
