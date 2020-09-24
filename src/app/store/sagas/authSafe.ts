import { SagaIterator } from "redux-saga";

import { api } from "app/backend";

import { call, put, take } from "./effects";

export function* callAuthSafe<PAYLOAD, F extends api.Call<PAYLOAD>>(
  fn: F,
  ...args: Parameters<F>
): SagaIterator<api.ResultOf<F>> {
  let response: api.ResultOf<F> = yield call<F>(fn, ...args);
  if (response.type === "UNAUTHORIZED") {
    // Ok, we got 401. So, ask for credentials and wait for login success...
    yield put({ type: "AUTH.REQUIRED" });
    yield take("AUTH.SUCCESS");
    // ...and then second attempt.
    response = yield call(fn, ...args);
    if (response.type === "UNAUTHORIZED") {
      api.log.stillUnauthorized();
    }
  }
  return response;
}
