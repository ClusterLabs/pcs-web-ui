import { call, put, takeEvery } from "redux-saga/effects";

import * as api from "app/core/api";
import * as NotificationActionCreator
  from "app/scenes/notifications/actionCreators";
import * as NotificationAction from "app/scenes/notifications/actions";
import * as authActions from "app/services/auth/actions";

import { LoginActionType } from "./types";
import * as LoginAction from "./actions";

export function* logout() {
  try {
    yield put<NotificationAction.Create>(
      NotificationActionCreator.info("Trying to logout"),
    );

    yield call(api.getForText, "/ui/logout");

    yield put<NotificationAction.Create>(
      NotificationActionCreator.success("Success logout"),
    );
    yield put<LoginAction.logoutSuccess>({
      type: LoginActionType.LOGOUT_SUCCESS,
    });
  } catch (error) {
    if (api.isUnauthorizedError(error)) {
      // Ok we are already somehow loged out.
      yield put<NotificationAction.Create>(
        NotificationActionCreator.success("Already logged out"),
      );
      yield put<LoginAction.logoutSuccess>({
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
  { payload: { username, password } }: LoginAction.enterCredentials,
) {
  try {
    yield call(api.postParamsForText, "/ui/login", {
      params: { username, password },
    });
    yield put(authActions.authSuccess());
  } catch (error) {
    yield put<LoginAction.loginFailed>({
      type: LoginActionType.LOGIN_FAILED,
      payload: {
        badCredentials: api.isUnauthorizedError(error),
        message: api.isUnauthorizedError(error) ? "" : error.message,
      },
    });
  }
}


export default [
  takeEvery(LoginActionType.LOGOUT, logout),
  takeEvery(LoginActionType.ENTER_CREDENTIALS, login),
];
