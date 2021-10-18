import { PutEffect } from "redux-saga/effects";

import { ActionMap, ActionPayload, actionNewId } from "app/store/actions";

import { delay, put } from "./effects";

const DISPLAY_MSECONDS = 8000;

type Notification = ActionPayload["NOTIFICATION.CREATE"];

export function* limitNotificationLife({
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
  const putEffect: PutEffect = yield put({
    type: "NOTIFICATION.CREATE",
    payload: {
      id: actionNewId(),
      severity,
      message,
      details,
    },
  });
  return putEffect;
}

const detailsInConsole = "Details in the browser console.";
export const messages = {
  taskFailed: (taskLabel: string, detail: string | null) =>
    `Task: ${taskLabel} failed${
      detail !== null ? ": " + detail : ""
    }. ${detailsInConsole}`,
};

export function* putTaskFailed(taskLabel: string, detail: string | null) {
  yield putNotification("ERROR", messages.taskFailed(taskLabel, detail));
}
