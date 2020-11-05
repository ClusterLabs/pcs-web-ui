import { sendKnownHosts } from "app/backend";
import { NodeActions } from "app/store/actions";

import { api, put, race, take } from "../common";

export function* sendKnownHostsSaga({
  payload: { clusterUrlName, nodeName },
}: NodeActions["NodeAddSendKnownHosts"]) {
  const {
    result,
  }: { result: api.ResultOf<typeof sendKnownHosts> } = yield race({
    result: api.authSafe(sendKnownHosts, clusterUrlName, [nodeName]),
    cancel: take("NODE.ADD.UPDATE_NODE_NAME"),
  });

  if (!result) {
    // cancelled; we no longer care about the fate of the call
    return;
  }

  if (result.type !== "OK") {
    yield put({
      type: "NODE.ADD.SEND_KNOWN_HOSTS.FAILED",
      payload: { clusterUrlName },
    });
    return;
  }
  yield put({
    type: "NODE.ADD.SEND_KNOWN_HOSTS.SUCCESS",
    payload: {
      clusterUrlName,
    },
  });
}
