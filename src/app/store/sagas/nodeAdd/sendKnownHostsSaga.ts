import { sendKnownHosts } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, put, race, take } from "../common";

export function* sendKnownHostsSaga({
  payload: { clusterUrlName, nodeName },
}: ActionMap["NODE.ADD.SEND_KNOWN_HOSTS"]) {
  const {
    result,
  }: { result: api.ResultOf<typeof sendKnownHosts> } = yield race({
    result: api.authSafe(sendKnownHosts, clusterUrlName, [nodeName]),
    cancel: take(["NODE.ADD.UPDATE_NODE_NAME", "NODE.ADD.CLOSE"]),
  });

  if (!result) {
    // cancelled; we no longer care about the fate of the call
    return;
  }

  if (result.type !== "OK") {
    yield put({
      type: "NODE.ADD.SEND_KNOWN_HOSTS.FAIL",
      payload: { clusterUrlName },
    });
    return;
  }
  yield put({
    type: "NODE.ADD.SEND_KNOWN_HOSTS.OK",
    payload: {
      clusterUrlName,
    },
  });
}
