import { call, put, take } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";

import * as api from "app/core/api";

import { AuthActionType } from "./types";

const decorateApiMethod = (
  apiMethod: api.types.ApiCall,
): api.types.ApiCall => function* AuthMethod(
  url: string,
  params: api.types.ApiParams = {},
): SagaIterator {
  try {
    const responseFirstAttempt = yield call(apiMethod, url, params);
    return responseFirstAttempt;
  } catch (error) {
    if (!api.error.isUnauthorizedError(error)) {
      throw error;
    }
  }

  // Ok, we got 401. So, ask for credentials and wait for login success...
  yield put({ type: AuthActionType.AUTH_REQUIRED });
  yield take(AuthActionType.AUTH_SUCCESS);

  // ...and then second attempt.
  try {
    const responseSecondAttempt = yield call(apiMethod, url, params);
    return responseSecondAttempt;
  } catch (error) {
    if (api.error.isUnauthorizedError(error)) {
      throw new Error(
        `Still got unauthorized from '${url}' after successfull authorization.`,
      );
    }
    throw error;
  }
};

export const getJson = decorateApiMethod(api.call.getJson);
export const postForText = decorateApiMethod(api.call.postForText);
