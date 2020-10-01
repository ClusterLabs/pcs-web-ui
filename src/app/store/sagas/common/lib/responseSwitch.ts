import { api } from "app/backend";
import { actions } from "app/store";

import { put } from "../effects";

export function* responseSwitch({
  clusterUrlName,
  taskLabel,
  response,
  communicationErrorAction,
  errorAction,
  successAction,
}: {
  clusterUrlName: string;
  taskLabel: string;
  response: api.types.libraryResponse.ApiResponse;
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
      api.log.libInputError(status, status_msg, communicationErrDesc);
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
