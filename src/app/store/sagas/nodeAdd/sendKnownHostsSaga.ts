import { sendKnownHosts } from "app/backend";
import { NodeActions } from "app/store/actions";

import { api, put } from "../common";

export function* sendKnownHostsSaga({
  payload: { clusterUrlName, nodeName },
}: NodeActions["NodeAddSendKnownHosts"]) {
  const result: api.ResultOf<typeof sendKnownHosts> = yield api.authSafe(
    sendKnownHosts,
    clusterUrlName,
    [nodeName],
  );

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
