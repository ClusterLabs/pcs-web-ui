import { put } from "./effects";
import { putNotification } from "./notifications";
import { Result } from "./api";
import { processError } from "./apiCall";

export function* clusterSuccess(clusterUrlName: string, taskLabel: string) {
  yield put({
    type: "CLUSTER.STATUS.REFRESH",
    id: { cluster: clusterUrlName },
  });
  yield putNotification("SUCCESS", `Succesfully done: ${taskLabel}`);
}

export function* processClusterResultBasic(
  clusterUrlName: string,
  taskLabel: string,
  result: Result<string>,
) {
  if (result.type !== "OK") {
    yield processError(result, taskLabel);
    return;
  }
  yield clusterSuccess(clusterUrlName, taskLabel);
}
