import { call, put, take } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";

import * as api from "app/common/api";
import * as AuthAction from "app/services/auth/actions";

import { ApiCall } from "./result";

export function authSafe< R, F extends ApiCall<R>>(fn: F) {
  return function* callApi(...args: Parameters<F>): SagaIterator {
    try {
      const responseFirstAttempt = yield call(fn, ...args);
      return responseFirstAttempt;
    } catch (error) {
      if (!api.error.isUnauthorizedError(error)) {
        throw error;
      }
    }

    // Ok, we got 401. So, ask for credentials and wait for login success...
    yield put<AuthAction.AuthRequired>({ type: "AUTH.REQUIRED" });
    const authSuccess: AuthAction.AuthSuccess["type"] = "AUTH.SUCCESS";
    yield take(authSuccess);
    // ...and then second attempt.
    try {
      const responseSecondAttempt = yield call(fn, ...args);
      return responseSecondAttempt;
    } catch (error) {
      if (api.error.isUnauthorizedError(error)) {
        throw new Error(
          "Still got unauthorized after successfull authorization.",
        );
      }
      throw error;
    }
  };
}
