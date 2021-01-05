import { api } from "app/backend";
import { actionNewId } from "app/store/actions";

import { clusterResponseSwitch } from "./responseSwitch";

export function* clusterResponseProcess(
  clusterName: string,
  taskLabel: string,
  payload: api.types.lib.Response,
) {
  /* eslint-disable-next-line camelcase */
  const { report_list } = payload;

  const reportList = report_list.map(
    r => `${r.severity.level}: ${r.message.message}`,
  );
  const communicationErrDesc = `Communication error while: ${taskLabel}`;

  yield clusterResponseSwitch(clusterName, taskLabel, payload, {
    successAction: {
      type: "NOTIFICATION.CREATE",
      payload: {
        id: actionNewId(),
        severity: "SUCCESS",
        message: `Succesfully done: ${taskLabel}`,
        details: {
          type: "LIST",
          title: "Messages from the backend",
          items: reportList,
        },
      },
    },
    errorAction: {
      type: "NOTIFICATION.CREATE",
      payload: {
        id: actionNewId(),
        severity: "ERROR",
        message: `Error while: ${taskLabel}`,
        details: {
          type: "LIST",
          title: "Messages from the backend",
          items: reportList,
        },
      },
    },
    communicationErrorAction: {
      type: "NOTIFICATION.CREATE",
      payload: {
        id: actionNewId(),
        severity: "ERROR",
        message: `${communicationErrDesc}. Details in the browser console`,
      },
    },
  });
}
