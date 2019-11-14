import { call, put, takeEvery } from "redux-saga/effects";

import { typeIs } from "app/common/utils";
import { putNotification } from "app/scenes/notifications";
import * as api from "app/common/api";
import * as AuthAction from "app/services/auth/actions";

import * as LoginAction from "./actions";

export function* logout() {
  try {
    yield putNotification("INFO", "Trying to logout");

    yield call(api.call.getForText, "/ui/logout");

    yield putNotification("SUCCESS", "Success logout");
    yield put<LoginAction.LogoutSuccess>({ type: "LOGOUT.SUCCESS" });
  } catch (error) {
    if (api.error.isUnauthorizedError(error)) {
      // Ok we are already somehow loged out.
      yield putNotification("SUCCESS", "Already logged out");
      yield put<LoginAction.LogoutSuccess>({ type: "LOGOUT.SUCCESS" });
    } else {
      yield putNotification("ERROR", `Cannot logout: ${error.message}`);
    }
  }
}

export function* login(
  { payload: { username, password } }: LoginAction.EnterCredentials,
) {
  try {
    yield call(api.call.postForText, "/ui/login", [
      ["username", username],
      ["password", password],
    ]);
    yield put<AuthAction.AuthSuccess>({
      type: "AUTH.SUCCESS",
      payload: { username },
    });
  } catch (error) {
    yield put<LoginAction.LoginFailed>({
      type: "LOGIN.FAILED",
      payload: {
        badCredentials: api.error.isUnauthorizedError(error),
        message: api.error.isUnauthorizedError(error) ? "" : error.message,
      },
    });
  }
}

export default [
  takeEvery(typeIs<LoginAction.Logout["type"]>("LOGOUT"), logout),
  takeEvery(
    typeIs<LoginAction.EnterCredentials["type"]>("ENTER_CREDENTIALS"),
    login,
  ),
];
