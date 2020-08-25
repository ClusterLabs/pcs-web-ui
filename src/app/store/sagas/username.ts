import { AuthActions } from "app/store/actions";

import { call, put, race, take, takeEvery } from "redux-saga/effects";

const USERNAME_STORAGE_KEY = "username";

function* usernameLoad() {
  const { username } = yield race({
    username: call([localStorage, "getItem"], USERNAME_STORAGE_KEY),
    cancel: take("AUTH.SUCCESS"),
  });
  // Empty username can mean no username in local storage as well.
  // It is an edge case. It should be corrected by next login. The only downside
  // is that username is not displayed.
  if (username) {
    yield put({
      type: "USERNAME.SET",
      payload: { username },
    });
  }
}

function* checkLogin({ payload: { username } }: AuthActions["AuthSuccess"]) {
  yield call([localStorage, "setItem"], USERNAME_STORAGE_KEY, username);
  yield put({
    type: "USERNAME.SET",
    payload: { username },
  });
}

export default [
  takeEvery("USERNAME.LOAD", usernameLoad),
  takeEvery("AUTH.SUCCESS", checkLogin),
];
