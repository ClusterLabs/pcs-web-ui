import { call, put, take } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";

import * as api from "app/common/api";
import { Action, actionType } from "app/actions";

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
    yield put<Action>({ type: "AUTH.REQUIRED" });
    yield take(actionType("AUTH.SUCCESS"));
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
