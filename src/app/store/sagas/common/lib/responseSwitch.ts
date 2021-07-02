import { api, libCallCluster } from "app/backend";
import { Action } from "app/store";

import { put } from "../effects";
import { libInputError } from "../log";

export function* clusterResponseSwitch(
  clusterName: string,
  taskLabel: string,
  payload: api.PayloadOf<typeof libCallCluster>,
  {
    communicationErrorAction,
    errorAction,
    successAction,
  }: {
    communicationErrorAction: Action;
    errorAction: Action;
    successAction: Action;
  },
) {
  const {
    /* eslint-disable camelcase */
    status,
    status_msg,
  } = payload;

  const communicationErrDesc = `Communication error while: ${taskLabel}`;
  switch (status) {
    case "input_error":
    case "exception":
    case "unknown_cmd":
      libInputError(status, status_msg, communicationErrDesc);
      yield put(communicationErrorAction);
      return;

    case "error":
      yield put(errorAction);
      return;

    case "success":
      yield put({
        type: "CLUSTER.STATUS.REFRESH",
        key: { clusterName },
      });
      yield put(successAction);
      return;

    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Status with value "${_exhaustiveCheck}" not expected`);
    }
  }
}

// TODO remove duplicity between previous and next function
export function* dashboardResponseSwitch(
  taskLabel: string,
  payload: api.PayloadOf<typeof libCallCluster>,
  {
    communicationErrorAction,
    errorAction,
    successAction,
  }: {
    communicationErrorAction: Action;
    errorAction: Action;
    successAction: Action;
  },
) {
  const {
    /* eslint-disable camelcase */
    status,
    status_msg,
  } = payload;

  const communicationErrDesc = `Communication error while: ${taskLabel}`;
  switch (status) {
    case "input_error":
    case "exception":
    case "unknown_cmd":
      libInputError(status, status_msg, communicationErrDesc);
      yield put(communicationErrorAction);
      return;

    case "error":
      yield put(errorAction);
      return;

    case "success":
      yield put({ type: "CLUSTER.LIST.REFRESH" });
      yield put(successAction);
      return;

    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Status with value "${_exhaustiveCheck}" not expected`);
    }
  }
}
