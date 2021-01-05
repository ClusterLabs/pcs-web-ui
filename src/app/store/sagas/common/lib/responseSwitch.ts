import { api } from "app/backend";
import { Action } from "app/store";

import { put } from "../effects";

export function* clusterResponseSwitch(
  clusterUrlName: string,
  taskLabel: string,
  payload: api.types.lib.Response,
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
      api.log.libInputError(status, status_msg, communicationErrDesc);
      yield put(communicationErrorAction);
      return;
    case "error":
      yield put(errorAction);
      return;
    case "success":
      yield put({
        type: "CLUSTER.STATUS.REFRESH",
        id: { cluster: clusterUrlName },
      });
      yield put(successAction);
      return;
    default: {
      const _exhaustiveCheck: never = status;
      throw new Error(`Status with value "${_exhaustiveCheck}" not expected`);
    }
  }
}
