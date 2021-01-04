import { authGuiAgainstNodes } from "app/backend";
import { ActionMap } from "app/store";

import { api, put, take, takeEvery } from "./common";

function* nodeAuthSaga({
  payload: { processId, nodeMap },
}: ActionMap["NODE.AUTH"]) {
  // AuthNode with processId disappear from redux store if NODE.AUTH.STOP
  // hapens during api call and the following action NODE.AUTH.FAIL or
  // NODE.AUTH.OK has no effect on redux store.
  // So, no race needed here. And moreover race is not appropriate here since
  // only NODE.AUTH.STOP with the same processId value should cancell api call.
  // But race would cancel api call on every NODE.AUTH.STOP
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
            processId,
            message: api.errorMessage(result, taskLabel),
          },
        }),
      useNotification: false,
    });
    return;
  }

  yield put({
    type: "NODE.AUTH.OK",
    payload: { processId, response: result.payload },
  });
}

type WaitAction = ActionMap["NODE.AUTH.OK"] | ActionMap["NODE.AUTH.STOP"];
export function* nodeAuthWait(authProcessId: number) {
  while (true) {
    const action: WaitAction = yield take(["NODE.AUTH.OK", "NODE.AUTH.STOP"]);

    if (action.type === "NODE.AUTH.STOP") {
      if (action.payload.processId === authProcessId) {
        return;
      }
      continue;
    }

    const { processId, response } = action.payload;
    if (
      processId === authProcessId
      && response.plaintext_error.length === 0
      && !(
        "local_cluster_node_auth_error" in response
        && response.local_cluster_node_auth_error
      )
      && "node_auth_error" in response
      && response.node_auth_error
      && Object.values(response.node_auth_error).every(v => v === 0)
    ) {
      return;
    }
  }
}

export default [takeEvery("NODE.AUTH", nodeAuthSaga)];
