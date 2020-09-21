import { log, types } from "app/backend";
import { actions } from "app/store";

import { createNotification } from "../notifications";
import { put } from "../effects";

export function* libraryResponseSwitch({
  clusterUrlName,
  taskLabel,
  response,
  communicationErrorAction,
  errorAction,
  successAction,
}: {
  clusterUrlName: string;
  taskLabel: string;
  response: types.libraryResponse.ApiResponse;
  communicationErrorAction: actions.Action;
  errorAction: actions.Action;
  successAction: actions.Action;
}) {
  const {
    /* eslint-disable camelcase */
    status,
    status_msg,
  } = response;

  const communicationErrDesc = `Communication error while: ${taskLabel}`;
  switch (status) {
    case "input_error":
    case "exception":
    case "unknown_cmd":
      log.libInputError(status, status_msg, communicationErrDesc);
      yield put(communicationErrorAction);
      return;
    case "error":
      yield put(errorAction);
      return;
    case "success":
      yield put({
        type: "CLUSTER_DATA.REFRESH",
        payload: { clusterUrlName },
      });
      yield put(successAction);
      return;
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Status with value "${_exhaustiveCheck}" not expected`);
    }
  }
}

export function* processLibraryResponse({
  taskLabel,
  clusterUrlName,
  response,
}: {
  taskLabel: string;
  clusterUrlName: string;
  response: types.libraryResponse.ApiResponse;
}) {
  const {
    /* eslint-disable camelcase */
    report_list,
  } = response;

  const reportList = report_list.map(
    r => `${r.severity.level}: ${r.message.message}`,
  );
  const communicationErrDesc = `Communication error while: ${taskLabel}`;

  yield libraryResponseSwitch({
    clusterUrlName,
    taskLabel,
    response,
    successAction: createNotification(
      "SUCCESS",
      `Succesfully done ${taskLabel}`,
      {
        type: "LIST",
        title: "Messages from the backend",
        items: reportList,
      },
    ),
    errorAction: createNotification("ERROR", `Error while: ${taskLabel}`, {
      type: "LIST",
      title: "Messages from the backend",
      items: reportList,
    }),
    communicationErrorAction: createNotification(
      "ERROR",
      `${communicationErrDesc}. Details in the browser console`,
    ),
  });
}
