import {updateResource} from "app/backend";
import type {ActionMap} from "app/store/actions";

import {api, processError, put} from "./common";

export function* updateInstanceAttributes({
  payload: {resourceId, attributes},
}: ActionMap["RESOURCE.EDIT_ATTRS.RUN"]) {
  const result: api.ResultOf<typeof updateResource> = yield api.authSafe(
    updateResource,
    resourceId,
    attributes,
  );

  const taskLabel = `update instance attributes of resource "${resourceId}"`;

  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      useNotification: false,
      action: () =>
        put({
          type: "RESOURCE.EDIT_ATTRS.RUN.ERROR",
          payload: {
            message: api.errorMessage(result, taskLabel),
          },
        }),
    });
    return;
  }

  if ("error" in result.payload) {
    const {stdout, stderr} = result.payload;
    yield put({
      type: "RESOURCE.EDIT_ATTRS.RUN.ERROR",
      payload: {
        message: `backend error:\n stdout:\n${stdout}\nstderr:\n${stderr}`,
      },
    });
    return;
  }

  yield put({type: "CLUSTER.STATUS.REFRESH"});
  yield put({type: "RESOURCE.EDIT_ATTRS.RUN.OK"});
}
