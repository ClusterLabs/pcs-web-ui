import { types } from "app/backend";

import { createNotification } from "../notifications";

import { libraryResponseSwitch } from "./libraryResponseSwitch";

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
