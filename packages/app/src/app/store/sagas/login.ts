import {login, logout} from "app/backend";
import type {ActionMap} from "app/store/actions";

import {log} from "./common";
import {
  type api,
  call,
  processError,
  put,
  putNotification,
  takeEvery,
} from "./common";

export function* logoutSaga() {
  yield putNotification("INFO", "Trying to logout");

  const result: api.ResultOf<typeof logout> = yield call(logout);
  if (result.type === "UNAUTHORIZED") {
    // Ok we are already somehow logged out.
    yield putNotification("SUCCESS", "Already logged out");
    yield put({type: "LOGIN.LOGOUT.SUCCESS"});
    yield put({type: "AUTH.REQUIRED"});
    return;
  }
  if (result.type !== "OK") {
    yield processError(result, "logout");
    return;
  }

  yield putNotification("SUCCESS", "Success logout");
  yield put({type: "LOGIN.LOGOUT.SUCCESS"});
  yield put({type: "AUTH.REQUIRED"});
  yield put({
    type: "DATA_READING.SET_UP",
    payload: {behavior: "replace", readings: []},
  });
}

export function* loginSaga({
  payload: {username, password},
}: ActionMap["LOGIN.ENTER_CREDENTIALS"]) {
  const result: api.ResultOf<typeof login> = yield call(
    login,
    username,
    password,
  );

  if (result.type !== "OK") {
    yield put({
      type: "LOGIN.FAILED",
      payload: {
        badCredentials: result.type === "UNAUTHORIZED",
        message:
          result.type === "UNAUTHORIZED"
            ? ""
            : log.errorMessage(result, "login"),
      },
    });
    return;
  }
  yield put({type: "AUTH.SUCCESS", payload: {username}});
}

export default [
  takeEvery("LOGIN.LOGOUT", logoutSaga),
  takeEvery("LOGIN.ENTER_CREDENTIALS", loginSaga),
];
