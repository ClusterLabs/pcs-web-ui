import {updateResource} from "app/backend";
import type {ActionMap} from "app/store/actions";

import {api, clusterSuccess, processError, putNotification} from "./common";

export function* updateInstanceAttributes({
  key,
  payload: {resourceId, attributes},
}: ActionMap["RESOURCE.UPDATE_INSTANCE_ATTRIBUTES"]) {
  yield putNotification(
    "INFO",
    `Update instance attributes of resource "${resourceId}" requested`,
  );
  const result: api.ResultOf<typeof updateResource> = yield api.authSafe(
    updateResource,
    key.clusterName,
    resourceId,
    attributes,
  );

  const taskLabel = `update instance attributes of resource "${resourceId}"`;

  if (result.type !== "OK") {
    yield processError(result, taskLabel);
    return;
  }

  if ("error" in result.payload) {
    const {stdout, stderr} = result.payload;
    yield putNotification("ERROR", `Task failed: ${taskLabel}: `, {
      type: "LINES",
      lines: ["backend error :", `stdout: ${stdout}`, `stderr: ${stderr}`],
    });
    return;
  }

  yield clusterSuccess(key.clusterName, taskLabel);
}
