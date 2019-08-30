import { delay, put, takeEvery } from "redux-saga/effects";

import { typeIs } from "app/common/utils";

import { Notification } from "./types";
import { create as createNotification } from "./actionCreators";
import * as NotificationAction from "./actions";

const DISPLAY_SECONDS = 4000;

function* limitNotificationLife(
  { payload: { notification: { id } } }: NotificationAction.Create,
) {
  yield delay(DISPLAY_SECONDS);
  yield put<NotificationAction.Destroy>({
    type: "NOTIFICATION.DESTROY",
    payload: { id },
  });
}

export function* putNotification(severity: Notification["severity"], message: string) {
  return yield put<NotificationAction.Create>(
    createNotification(severity, message),
  );
}

export default [
  takeEvery(
    typeIs<NotificationAction.Create["type"]>("NOTIFICATION.CREATE"),
    limitNotificationLife,
  ),
];
