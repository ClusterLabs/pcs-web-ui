import { call, put, take } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";

import * as api from "app/common/api";
import * as AuthAction from "app/services/auth/actions";

export function dealWithNoAuth<
  R,
  Fn extends(...args: any[]) => Promise<R>
>(apiCallFn: Fn) {
  function* decorated(...args: Parameters<Fn>): SagaIterator {
    try {
      const responseFirstAttempt = yield call(apiCallFn, ...args);
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
      const responseSecondAttempt = yield call(apiCallFn, ...args);
      return responseSecondAttempt;
    } catch (error) {
      if (api.error.isUnauthorizedError(error)) {
        throw new Error(
          "Still got unauthorized after successfull authorization.",
        );
      }
      throw error;
    }
  }
  return decorated;
}
