import {
  takeEvery,
  put,
  call,
  take,
  race,
} from "redux-saga/effects";

import { typeIs } from "app/common/utils";
import * as AuthAction from "app/services/auth/actions";

import * as UsernameAction from "./actions";

const USERNAME_STORAGE_KEY = "username";

function* usernameLoad() {
  const { username } = yield race({
    username: call([localStorage, "getItem"], USERNAME_STORAGE_KEY),
    cancel: take(typeIs<AuthAction.AuthSuccess["type"]>("AUTH.SUCCESS")),
  });
  // Empty username can mean no username in local storage as well.
  // It is an edge case. It should be corrected by next login. The only downside
  // is that username is not displayed.
  if (username) {
    yield put<UsernameAction.SetUsername>({
      type: "USERNAME.SET",
      payload: { username },
    });
  }
}

function* checkLogin({ payload: { username } }: AuthAction.AuthSuccess) {
  yield call([localStorage, "setItem"], USERNAME_STORAGE_KEY, username);
  yield put<UsernameAction.SetUsername>({
    type: "USERNAME.SET",
    payload: { username },
  });
}

export default [
  takeEvery(
    typeIs<UsernameAction.LoadUsername["type"]>("USERNAME.LOAD"),
    usernameLoad,
  ),
  takeEvery(typeIs<AuthAction.AuthSuccess["type"]>("AUTH.SUCCESS"), checkLogin),
];
