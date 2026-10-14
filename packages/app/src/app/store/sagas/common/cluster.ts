import {put} from "./effects";
import {putNotification} from "./notifications";
import type * as api from "./api";
import {processError} from "./apiCall";

export function* clusterSuccess(taskLabel: string) {
  yield put({type: "CLUSTER.STATUS.REFRESH"});
  yield putNotification("SUCCESS", `Successfully done: ${taskLabel}`);
}

export function* processClusterResultBasic(
  taskLabel: string,
  result: api.result.Overall<string>,
) {
  if (result.type !== "OK") {
    yield processError(result, taskLabel);
    return;
  }
  yield clusterSuccess(taskLabel);
}
