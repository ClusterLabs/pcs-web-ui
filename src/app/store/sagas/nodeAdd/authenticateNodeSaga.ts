import { authGuiAgainstNodes } from "app/backend";
import { NodeActions } from "app/store/actions";

import { api, put } from "../common";

export function* authenticateNodeSaga({
  payload: { clusterUrlName, nodeName, password, port, address },
}: NodeActions["NodeAddAuthenticate"]) {
  const result: api.ResultOf<typeof authGuiAgainstNodes> = yield api.authSafe(
    authGuiAgainstNodes,
    {
      [nodeName]: {
        password,
        dest_list: [{ addr: address, port }],
      },
    },
  );

  const taskLabel = `authenticate node "${nodeName}"`;
  if (result.type !== "OK") {
    yield api.processError(result, taskLabel, {
      action: () =>
        put({
          type: "NODE.ADD.AUTHENTICATE.FAILED",
          payload: {
            clusterUrlName,
            message: api.errorMessage(result, taskLabel),
          },
        }),
      useNotification: false,
    });
    return;
  }

  if (result.payload.node_auth_error[nodeName] !== 0) {
    yield put({
      type: "NODE.ADD.AUTHENTICATE.FAILED",
      payload: {
        clusterUrlName,
        message: `${taskLabel} failed.`,
      },
    });
    return;
  }

  yield put({
    type: "NODE.ADD.SEND_KNOWN_HOSTS",
    payload: {
      clusterUrlName,
      nodeName,
    },
  });
}
