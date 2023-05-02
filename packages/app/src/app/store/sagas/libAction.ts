import {libCallCluster} from "app/backend";
import {ActionMap, actionNewId} from "app/store/actions";

import {api, lib, log, processError, put} from "./common";

export function* callLib({
  key,
  payload: {call: command, taskLabel},
}: ActionMap["LIB.CALL.CLUSTER"]) {
  const result: api.ResultOf<typeof libCallCluster> = yield api.authSafe(
    libCallCluster,
    {clusterName: key.clusterName, command},
  );

  if (result.type !== "OK") {
    yield processError(result, taskLabel);
    return;
  }

  const {payload} = result;

  if (lib.isCommunicationError(payload)) {
    log.libInputError(payload.status, payload.status_msg, taskLabel);
    yield put({
      type: "NOTIFICATION.CREATE",
      payload: {
        id: actionNewId(),
        severity: "ERROR",
        message: `Communication error while: ${taskLabel}. Details in the browser console`,
        inToast: true,
        isRead: false,
        creationTime: new Date(),
      },
    });
    return;
  }
  const reportList = payload.report_list.map(
    r => `${r.severity.level}: ${r.message.message}`,
  );

  if (payload.status === "error") {
    yield put({
      type: "NOTIFICATION.CREATE",
      payload: {
        id: actionNewId(),
        severity: "ERROR",
        message: `Error while: ${taskLabel}`,
        inToast: true,
        isRead: false,
        creationTime: new Date(),
        details: {
          type: "LIST",
          title: "Messages from the backend",
          items: reportList,
        },
      },
    });
    return;
  }

  yield put({
    type: "CLUSTER.STATUS.REFRESH",
    key,
  });
  yield put({
    type: "NOTIFICATION.CREATE",
    payload: {
      id: actionNewId(),
      severity: "SUCCESS",
      message: `Successfully done: ${taskLabel}`,
      inToast: true,
      isRead: false,
      creationTime: new Date(),
      details: {
        type: "LIST",
        title: "Messages from the backend",
        items: reportList,
      },
    },
  });
}
