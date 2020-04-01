import { call, put, takeEvery } from "redux-saga/effects";

import { Action, actionType, LoginActions } from "app/actions";
import { isUnauthorizedError, getForText, postForText } from "app/backend";

import { putNotification } from "./notifications";

export function* logout() {
  try {
    yield putNotification("INFO", "Trying to logout");

    yield call(getForText, "/ui/logout");

    yield putNotification("SUCCESS", "Success logout");
    yield put<Action>({ type: "LOGOUT.SUCCESS" });
  } catch (error) {
    if (isUnauthorizedError(error)) {
      // Ok we are already somehow loged out.
      yield putNotification("SUCCESS", "Already logged out");
      yield put<Action>({ type: "LOGOUT.SUCCESS" });
    } else {
      yield putNotification("ERROR", `Cannot logout: ${error.message}`);
    }
  }
}

export function* login(
  { payload: { username, password } }: LoginActions["EnterCredentials"],
) {
  try {
    yield call(postForText, "/ui/login", [
      ["username", username],
      ["password", password],
    ]);
    yield put<Action>({
      type: "AUTH.SUCCESS",
      payload: { username },
    });
  } catch (error) {
    yield put<Action>({
      type: "LOGIN.FAILED",
      payload: {
        badCredentials: isUnauthorizedError(error),
        message: isUnauthorizedError(error) ? "" : error.message,
      },
    });
  }
}

export default [
  takeEvery(actionType("LOGOUT"), logout),
  takeEvery(actionType("ENTER_CREDENTIALS"), login),
];
