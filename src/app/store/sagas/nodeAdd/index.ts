import { takeEvery } from "../common";

import { checkCanAddNodeSaga } from "./checkCanAddNodeSaga";
import { checkAuthSaga } from "./checkAuthSaga";
import { nodeAddSaga } from "./nodeAddSaga";
import { sendKnownHostsSaga } from "./sendKnownHostsSaga";
import { authenticateNodeSaga } from "./authenticateNodeSaga";

export default [
  takeEvery("NODE.ADD.CHECK_CAN_ADD", checkCanAddNodeSaga),
  takeEvery("NODE.ADD.CHECK_AUTH", checkAuthSaga),
  takeEvery("NODE.ADD.SEND_KNOWN_HOSTS", sendKnownHostsSaga),
  takeEvery("NODE.ADD", nodeAddSaga),
  takeEvery("NODE.ADD.AUTHENTICATE", authenticateNodeSaga),
];
