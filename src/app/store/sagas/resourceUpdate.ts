import { ActionMap } from "app/store/actions";
import { updateResource } from "app/backend";

import {
  api,
  clusterSuccess,
  processError,
  putNotification,
  takeEvery,
} from "./common";

function* updateInstanceAttributes({
  payload: { resourceId, attributes, clusterUrlName },
}: ActionMap["RESOURCE.UPDATE_INSTANCE_ATTRIBUTES"]) {
  yield putNotification(
    "INFO",
    `Update instance attributes of resource "${resourceId}" requested`,
  );
  const result: api.ResultOf<typeof updateResource> = yield api.authSafe(
    updateResource,
    clusterUrlName,
    resourceId,
    attributes,
  );

  const taskLabel = `update instance attributes of resource "${resourceId}"`;

  if (result.type !== "OK") {
    yield processError(result, taskLabel);
    return;
  }

  if (result.payload.error === "true") {
    const { stdout, stderr } = result.payload;
    yield putNotification("ERROR", `Task failed: ${taskLabel}: `, {
      type: "LINES",
      lines: ["backend error :", `stdout: ${stdout}`, `stderr: ${stderr}`],
    });
    return;
  }

  yield clusterSuccess(clusterUrlName, taskLabel);
}

export default [
  takeEvery("RESOURCE.UPDATE_INSTANCE_ATTRIBUTES", updateInstanceAttributes),
];
