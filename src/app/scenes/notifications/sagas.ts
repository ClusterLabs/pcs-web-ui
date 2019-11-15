import { delay, put, takeEvery } from "redux-saga/effects";

import { Action, actionType } from "app/common/actions";

import { Notification } from "./types";
import { create as createNotification } from "./actionCreators";
import { NotificationActions } from "./actions";

const DISPLAY_SECONDS = 4000;

function* limitNotificationLife(
  { payload: { notification: { id } } }: NotificationActions["Create"],
) {
  yield delay(DISPLAY_SECONDS);
  yield put<Action>({
    type: "NOTIFICATION.DESTROY",
    payload: { id },
  });
}

export function* putNotification(
  severity: Notification["severity"],
  message: string,
) {
  return yield put<Action>(
    createNotification(severity, message),
  );
}

export default [
  takeEvery(actionType("NOTIFICATION.CREATE"), limitNotificationLife),
];
