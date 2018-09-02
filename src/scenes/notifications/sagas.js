import {call, put, takeEvery} from 'redux-saga/effects'
import {delay} from "redux-saga";

import * as actions from "./actions"
import * as types from "./constants"


function* planClosing({ payload: { id: notificationId } }) {
  yield call(delay, 3000);
  yield put(actions.destroy(notificationId));
}

export default [
  takeEvery(types.TO_SUCCESS, planClosing),
];
