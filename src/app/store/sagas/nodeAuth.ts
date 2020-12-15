import { authGuiAgainstNodes } from "app/backend";
import { ActionMap } from "app/store";

import { api, put, takeEvery } from "./common";

function* nodeAuthSaga({
  payload: { clusterUrlName, nodeMap },
}: ActionMap["NODE.AUTH"]) {
  const result: api.ResultOf<typeof authGuiAgainstNodes> = yield api.authSafe(
    authGuiAgainstNodes,
    Object.entries(nodeMap).reduce(
      (map, [nodeName, authInfo]) => ({
        ...map,
        [nodeName]: {
          password: authInfo.password,
          dest_list: [
            {
              addr: authInfo.address,
              port: authInfo.port,
            },
          ],
        },
      }),
      {},
    ),
  );
  const taskLabel = `authenticate nodes "${Object.keys(nodeMap).join(", ")}"`;
  if (result.type !== "OK") {
    yield api.processError(result, taskLabel, {
      action: () =>
        put({
          type: "NODE.AUTH.FAIL",
          payload: {
            clusterUrlName,
            message: api.errorMessage(result, taskLabel),
          },
        }),
      useNotification: false,
    });
    return;
  }

  //TODO
  const nodeName = Object.keys(nodeMap)[0];
  if (result.payload.node_auth_error[nodeName] !== 0) {
    yield put({
      type: "NODE.AUTH.BAD_INFO",
      payload: { clusterUrlName },
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

export default [takeEvery("NODE.AUTH", nodeAuthSaga)];
