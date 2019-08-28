import { call, put, takeEvery } from "redux-saga/effects";

import * as api from "app/core/api";
import * as NotificationActionCreator
  from "app/scenes/notifications/actionCreators";
import * as NotificationAction from "app/scenes/notifications/actions";
import * as AuthAction from "app/services/auth/actions";

import { LoginActionType } from "./types";
import * as LoginAction from "./actions";

export function* logout() {
  try {
    yield put<NotificationAction.Create>(
      NotificationActionCreator.info("Trying to logout"),
    );

    yield call(api.call.getForText, "/ui/logout");

    yield put<NotificationAction.Create>(
      NotificationActionCreator.success("Success logout"),
    );
    yield put<LoginAction.LogoutSuccess>({
      type: LoginActionType.LOGOUT_SUCCESS,
    });
  } catch (error) {
    if (api.error.isUnauthorizedError(error)) {
      // Ok we are already somehow loged out.
      yield put<NotificationAction.Create>(
        NotificationActionCreator.success("Already logged out"),
      );
      yield put<LoginAction.LogoutSuccess>({
        type: LoginActionType.LOGOUT_SUCCESS,
      });
    } else {
      yield put<NotificationAction.Create>(
        NotificationActionCreator.error(`Cannot logout: ${error.message}`),
      );
    }
  }
}

export function* login(
  { payload: { username, password } }: LoginAction.EnterCredentials,
) {
  try {
    yield call(api.call.postForText, "/ui/login", { username, password });
    yield put<AuthAction.AuthSuccess>({ type: "AUTH.SUCCESS" });
  } catch (error) {
    yield put<LoginAction.LoginFailed>({
      type: LoginActionType.LOGIN_FAILED,
      payload: {
        badCredentials: api.error.isUnauthorizedError(error),
        message: api.error.isUnauthorizedError(error) ? "" : error.message,
      },
    });
  }
}

export default [
  takeEvery(LoginActionType.LOGOUT, logout),
  takeEvery(LoginActionType.ENTER_CREDENTIALS, login),
];
