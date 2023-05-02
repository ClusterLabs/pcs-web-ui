import {existingCluster} from "app/backend";
import {ActionMap} from "app/store/actions";

import {api, log, put} from "../common";

export function* importExistingCluster({
  payload: {nodeName},
}: ActionMap["DASHBOARD.CLUSTER.IMPORT.RUN"]) {
  const result: api.ResultOf<typeof existingCluster> = yield api.authSafe(
    existingCluster,
    nodeName,
  );

  if (result.type === "BAD_HTTP_STATUS" && result.status === 400) {
    yield put({
      type: "DASHBOARD.CLUSTER.IMPORT.RUN.ERROR",
      payload: {message: result.text},
    });
    return;
  }

  if (result.type !== "OK") {
    yield put({
      type: "DASHBOARD.CLUSTER.IMPORT.RUN.ERROR",
      payload: {
        message: log.errorMessage(result, `add cluster (node: "${nodeName}")`),
      },
    });
    return;
  }

  yield put({type: "CLUSTER.LIST.REFRESH"});
  yield put({type: "DASHBOARD.CLUSTER.IMPORT.RUN.OK"});
}
