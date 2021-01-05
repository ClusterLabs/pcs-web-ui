import { put } from "./effects";
import { putNotification } from "./notifications";
import { Result } from "./api";
import { processError } from "./apiCall";

export function* clusterSuccess(clusterName: string, taskLabel: string) {
  yield put({
    type: "CLUSTER.STATUS.REFRESH",
    id: { cluster: clusterName },
  });
  yield putNotification("SUCCESS", `Succesfully done: ${taskLabel}`);
}

export function* processClusterResultBasic(
  clusterName: string,
  taskLabel: string,
  result: Result<string>,
) {
  if (result.type !== "OK") {
    yield processError(result, taskLabel);
    return;
  }
  yield clusterSuccess(clusterName, taskLabel);
}
