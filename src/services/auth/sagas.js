import {put, take} from 'redux-saga/effects'

import * as api from "~/services/api.js"

import * as types from "./constants"
import * as actions from "./actions"

export function* getJson(url, options={}){
  try{
    const responseFirstAttempt = yield api.getJson(url, options);
    return responseFirstAttempt;
  }catch(error){
    if( ! api.isUnauthorizedError(error)){
      throw error;
    }
  }

  // Ok, we got 401. So, ask for a and wait for login success...
  yield put(actions.authRequired())
  yield take(types.AUTH_SUCCESS)

  // ...and then second attempt.
  try{
    const responseSecondAttempt = yield api.getJson(url, options);
    return responseSecondAttempt;
  }catch(error){
    if( ! api.isUnauthorizedError(error)){
      throw error;
    }

    throw new Error(
      `Still got unauthorized from '${url}' after successfull authorization.`
    );
  }
}
