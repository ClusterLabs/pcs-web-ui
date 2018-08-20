import {call, put, take} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';

import {
  login,
  withAuthCare,
} from "./sagas.js"
import * as loginActions from "./actions"
import * as loginTypes from "./constants"
import * as api from "./api.js"

describe('withAuthCare', function() {
  const apiCall = jest.fn()
  const apiResponse = {
    success: {status: 200, data: "raw data"},
    fail: {status: 401, data: {notauthorized: true}},
  };
  it('proxyfies an api call', function(){
    testSaga(withAuthCare, apiCall).next()
      .call(apiCall).next(apiResponse.success)
      .returns(apiResponse.success)
  });

  it('proxyfies an api call after success login when required', function(){
    testSaga(withAuthCare, apiCall).next()
      .call(apiCall).next(apiResponse.fail)
      .put(loginActions.requireLogin()).next()
      .take(loginTypes.LOGIN_SUCCESS).next()
      .call(apiCall).next(apiResponse.success)
      .returns(apiResponse.success)
  });

});

describe('login', function(){
  const username = "a";
  const password = "b";
  const enterCredentials = {
    type: loginTypes.ENTER_CREDENTIALS,
    payload: { username, password }
  };

  const loginResponse = {
    success: {status: 200, data: "123"},
    fail: {status: 401, data: {notauthorized: true}},
  };


  it('call login failed when api fails', function(){
    testSaga(login, enterCredentials).next()
      .call(api.login, username, password).next(loginResponse.fail)
      .put(loginActions.loginFailed()).next()
      .isDone()
    ;
  });
  it('call login success when api succeeds', function(){
    testSaga(login, enterCredentials).next()
      .call(api.login, username, password).next(loginResponse.success)
      .put(loginActions.loginSuccess()).next()
      .isDone()
    ;
  });
});
