import { authGuiAgainstNodes } from "app/backend";
import { ActionMap } from "app/store";

import { api, put, takeEvery } from "./common";

function* nodeAuthSaga({
  payload: { processId, nodeMap },
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

export default [takeEvery("NODE.AUTH", nodeAuthSaga)];
