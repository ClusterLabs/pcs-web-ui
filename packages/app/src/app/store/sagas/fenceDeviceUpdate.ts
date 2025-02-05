import {updateFenceDevice} from "app/backend";
import type {ActionMap} from "app/store/actions";

import {api, processError, put} from "./common";

export function* updateArguments({
  key,
  payload: {fenceDeviceId, attributes},
}: ActionMap["FENCE_DEVICE.EDIT_ARGS.RUN"]) {
  const result: api.ResultOf<typeof updateFenceDevice> = yield api.authSafe(
    updateFenceDevice,
    key.clusterName,
    fenceDeviceId,
    attributes,
  );

  const taskLabel = `update arguments of fence device "${fenceDeviceId}"`;

  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      useNotification: false,
      action: () =>
        put({
          type: "FENCE_DEVICE.EDIT_ARGS.RUN.ERROR",
          key,
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
      type: "FENCE_DEVICE.EDIT_ARGS.RUN.ERROR",
      key,
      payload: {
        message: `backend error:\n stdout:\n${stdout}\nstderr:\n${stderr}`,
      },
    });
    return;
  }

  yield put({type: "CLUSTER.STATUS.REFRESH", key});
  yield put({type: "FENCE_DEVICE.EDIT_ARGS.RUN.OK", key});
}
