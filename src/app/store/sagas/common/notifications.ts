import { ActionMap, actionNewId } from "app/store/actions";

import { delay, put, takeEvery } from "./effects";

const DISPLAY_MSECONDS = 8000;

type Notification = ActionMap["NOTIFICATION.CREATE"]["payload"];

function* limitNotificationLife({
  payload: { id },
}: ActionMap["NOTIFICATION.CREATE"]) {
  yield delay(DISPLAY_MSECONDS);
  yield put({
    type: "NOTIFICATION.DESTROY",
    payload: { id },
  });
}

export function* putNotification(
  severity: Notification["severity"],
  message: string,
  details: Notification["details"] = undefined,
) {
  return yield put({
    type: "NOTIFICATION.CREATE",
    payload: {
      id: actionNewId(),
      severity,
      message,
      details,
    },
  });
}

export default [takeEvery("NOTIFICATION.CREATE", limitNotificationLife)];
