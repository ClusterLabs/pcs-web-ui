import { delay, put, takeEvery } from "redux-saga/effects";

import { NotificationActionType } from "./types";
import * as NotificationAction from "./actions";

const DISPLAY_SECONDS = 4000;

function* limitNotificationLife(
  { payload: { notification: { id } } }: NotificationAction.Create,
) {
  yield delay(DISPLAY_SECONDS);
  yield put<NotificationAction.Destroy>({
    type: NotificationActionType.DESTROY,
    payload: { id },
  });
}

export default [
  takeEvery(NotificationActionType.CREATE, limitNotificationLife),
];
