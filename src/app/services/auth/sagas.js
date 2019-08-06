import { call, put, take } from "redux-saga/effects";

import * as api from "app/core/api";

import { AuthActionType } from "./types";

const decorateApiMethod = apiMethod => function* AuthMethod(
  url,
  options = {},
) {
  try {
    const responseFirstAttempt = yield call(apiMethod, url, options);
    return responseFirstAttempt;
  } catch (error) {
    if (!api.isUnauthorizedError(error)) {
      throw error;
    }
  }

  // Ok, we got 401. So, ask for credentials and wait for login success...
  yield put({ type: AuthActionType.AUTH_REQUIRED });
  yield take(AuthActionType.AUTH_SUCCESS);

  // ...and then second attempt.
  try {
    const responseSecondAttempt = yield call(apiMethod, url, options);
    return responseSecondAttempt;
  } catch (error) {
    if (api.isUnauthorizedError(error)) {
      throw new Error(
        `Still got unauthorized from '${url}' after successfull authorization.`,
      );
    }
    throw error;
  }
};

export const getJson = decorateApiMethod(api.getJson);
export const postParamsForText = decorateApiMethod(api.postParamsForText);
