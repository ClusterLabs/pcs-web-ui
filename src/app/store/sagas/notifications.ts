import { delay, put, takeEvery } from "redux-saga/effects";

import { Action, actionType, NotificationActions } from "app/actions";

const DISPLAY_MSECONDS = 8000;
let nextId = 1;

type CreateNotification = NotificationActions["Create"];

function* limitNotificationLife(
  { payload: { notification: { id } } }: CreateNotification,
) {
  yield delay(DISPLAY_MSECONDS);
  yield put<Action>({
    type: "NOTIFICATION.DESTROY",
    payload: { id },
  });
}

export function* putNotification(
  severity: CreateNotification["payload"]["notification"]["severity"],
  message: string,
) {
  return yield put<Action>({
    type: "NOTIFICATION.CREATE",
    payload: {
      notification: {
        id: nextId++,
        severity,
        message,
      },
    },
  });
}

export default [
  takeEvery(actionType("NOTIFICATION.CREATE"), limitNotificationLife),
];
