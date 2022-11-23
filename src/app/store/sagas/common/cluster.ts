import {put} from "./effects";
import {putNotification} from "./notifications";
import * as api from "./api";
import {processError} from "./apiCall";

export function* clusterSuccess(clusterName: string, taskLabel: string) {
  yield put({
    type: "CLUSTER.STATUS.REFRESH",
    key: {clusterName},
  });
  yield putNotification("SUCCESS", `Successfully done: ${taskLabel}`);
}

export function* processClusterResultBasic(
  clusterName: string,
  taskLabel: string,
  result: api.result.Overall<string>,
) {
  if (result.type !== "OK") {
    yield processError(result, taskLabel);
    return;
  }
  yield clusterSuccess(clusterName, taskLabel);
}
