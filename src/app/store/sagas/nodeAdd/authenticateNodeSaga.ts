import { authGuiAgainstNodes } from "app/backend";
import { ActionMap } from "app/store";

import { api, put, race, take } from "../common";

export function* authenticateNodeSaga({
  payload: { clusterUrlName, nodeName, password, port, address },
}: ActionMap["NODE.ADD.AUTHENTICATE"]) {
  const {
    result,
  }: { result: api.ResultOf<typeof authGuiAgainstNodes> } = yield race({
    result: api.authSafe(authGuiAgainstNodes, {
      [nodeName]: {
        password,
        dest_list: [{ addr: address, port }],
      },
    }),
    cancel: take(["NODE.ADD.UPDATE_NODE_NAME", "NODE.ADD.CLOSE"]),
  });

  const taskLabel = `authenticate node "${nodeName}"`;
  if (result.type !== "OK") {
    yield api.processError(result, taskLabel, {
      action: () =>
        put({
          type: "NODE.ADD.AUTHENTICATE.FAIL",
          payload: {
            clusterUrlName,
            message: api.errorMessage(result, taskLabel),
          },
        }),
      useNotification: false,
    });
    return;
  }

  if (
    "node_auth_error" in result.payload
    && result.payload.node_auth_error
    && result.payload.node_auth_error[nodeName] === 0
  ) {
    yield put({
      type: "NODE.ADD.SEND_KNOWN_HOSTS",
      payload: {
        clusterUrlName,
        nodeName,
      },
    });
  }

  yield put({
    type: "NODE.ADD.AUTHENTICATE.BAD_INFO",
    payload: { clusterUrlName },
  });
}
