import { getForText, isUnauthorizedError, postForText } from "app/backend";
import { LoginActions } from "app/store/actions";

import { call, put, takeEvery } from "./effects";
import { putNotification } from "./notifications";

export function* logout() {
  try {
    yield putNotification("INFO", "Trying to logout");

    yield call(getForText, "/ui/logout");

    yield putNotification("SUCCESS", "Success logout");
    yield put({ type: "LOGOUT.SUCCESS" });
  } catch (error) {
    if (isUnauthorizedError(error)) {
      // Ok we are already somehow loged out.
      yield putNotification("SUCCESS", "Already logged out");
      yield put({ type: "LOGOUT.SUCCESS" });
    } else {
      yield putNotification("ERROR", `Cannot logout: ${error.message}`);
    }
  }
}

export function* login({
  payload: { username, password },
}: LoginActions["EnterCredentials"]) {
  try {
    yield call(postForText, "/ui/login", [
      ["username", username],
      ["password", password],
    ]);
    yield put({
      type: "AUTH.SUCCESS",
      payload: { username },
    });
  } catch (error) {
    yield put({
      type: "LOGIN.FAILED",
      payload: {
        badCredentials: isUnauthorizedError(error),
        message: isUnauthorizedError(error) ? "" : error.message,
      },
    });
  }
}

export default [
  takeEvery("LOGOUT", logout),
  takeEvery("ENTER_CREDENTIALS", login),
];
