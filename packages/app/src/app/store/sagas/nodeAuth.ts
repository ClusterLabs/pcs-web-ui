import {authGuiAgainstNodes} from "app/backend";
import type {ActionMap} from "app/store";

import {api, put, take} from "./common";

export function* nodeAuthSaga({
  key,
  payload: {nodeMap},
}: ActionMap["NODE.AUTH"]) {
  // AuthNode with id.process disappear from redux store if NODE.AUTH.STOP
  // happens during api call and the following action NODE.AUTH.FAIL or
  // NODE.AUTH.OK has no effect on redux store.
  // So, no race needed here. And moreover race is not appropriate here since
  // only NODE.AUTH.STOP with the same id.process value should cancell api call.
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
          key,
          payload: {message: api.errorMessage(result, taskLabel)},
        }),
      useNotification: false,
    });
    return;
  }

  yield put({
    type: "NODE.AUTH.OK",
    key,
    payload: {response: result.payload},
  });
}

type WaitAction = ActionMap["NODE.AUTH.OK"] | ActionMap["NODE.AUTH.STOP"];
export function* nodeAuthWait(authProcessId: number) {
  while (true) {
    const action: WaitAction = yield take(["NODE.AUTH.OK", "NODE.AUTH.STOP"]);

    if (action.type === "NODE.AUTH.STOP") {
      if (action.key.process === authProcessId) {
        return;
      }
      continue;
    }

    const {
      key,
      payload: {response},
    } = action;
    if (
      key.process === authProcessId &&
      response.plaintext_error.length === 0 &&
      !(
        "local_cluster_node_auth_error" in response &&
        response.local_cluster_node_auth_error !== undefined &&
        Object.keys(response.local_cluster_node_auth_error).length > 0
      ) &&
      "node_auth_error" in response &&
      response.node_auth_error &&
      Object.values(response.node_auth_error).every(v => v === 0)
    ) {
      return;
    }
  }
}
