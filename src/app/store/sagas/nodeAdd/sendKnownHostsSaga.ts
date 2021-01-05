import { sendKnownHosts } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, put, race, take } from "../common";

export function* sendKnownHostsSaga({
  key,
  payload: { nodeName },
}: ActionMap["NODE.ADD.SEND_KNOWN_HOSTS"]) {
  const {
    result,
  }: { result: api.ResultOf<typeof sendKnownHosts> } = yield race({
    result: api.authSafe(sendKnownHosts, key.clusterName, [nodeName]),
    cancel: take(["NODE.ADD.UPDATE_NODE_NAME", "NODE.ADD.CLOSE"]),
  });

  if (!result) {
    // cancelled; we no longer care about the fate of the call
    return;
  }

  if (result.type !== "OK") {
    yield put({
      type: "NODE.ADD.SEND_KNOWN_HOSTS.FAIL",
      key,
    });
    return;
  }
  yield put({
    type: "NODE.ADD.SEND_KNOWN_HOSTS.OK",
    key,
  });
}
