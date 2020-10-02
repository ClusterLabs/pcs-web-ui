import { api } from "app/backend";

import { createNotification } from "../notifications";

import { clusterResponseSwitch } from "./responseSwitch";

export function* clusterResponseProcess(
  clusterUrlName: string,
  taskLabel: string,
  payload: api.types.lib.Response,
) {
  const {
    /* eslint-disable camelcase */
    report_list,
  } = payload;

  const reportList = report_list.map(
    r => `${r.severity.level}: ${r.message.message}`,
  );
  const communicationErrDesc = `Communication error while: ${taskLabel}`;

  yield clusterResponseSwitch(clusterUrlName, taskLabel, payload, {
    successAction: createNotification(
      "SUCCESS",
      `Succesfully done: ${taskLabel}`,
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
