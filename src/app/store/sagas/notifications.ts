import { NotificationActions } from "app/store/actions";

import { delay, put, takeEvery } from "./effects";

const DISPLAY_MSECONDS = 8000;
let nextId = 1;

type CreateNotification = NotificationActions["Create"];
type Notification = CreateNotification["payload"]["notification"];

function* limitNotificationLife({
  payload: {
    notification: { id },
  },
}: CreateNotification) {
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
      notification: {
        id: nextId++,
        severity,
        message,
        details,
      },
    },
  });
}

export default [takeEvery("NOTIFICATION.CREATE", limitNotificationLife)];
