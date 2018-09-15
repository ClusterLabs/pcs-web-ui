import {call, put, takeEvery} from 'redux-saga/effects'

import * as api from "app/services/api.js"
import * as auth from "app/services/auth/sagas.js"

import * as dashboardActions from "./actions"
import * as dashboardTypes from "./constants"

export function* fetchDashboardData(action){
  try{
    const dashboardData = yield call(auth.getJson, "/clusters_overview", {
      transform: apiData => ({
        clusterList: apiData.cluster_list.map(
          cluster => ({name: cluster.cluster_name})
        )
      }),
    });
    yield put(dashboardActions.fetchDashboardDataSuccess(dashboardData));
  }catch(error){
    yield put(dashboardActions.fetchDashboardDataFailed(api.fail(error)));
  }
}

export default [
  takeEvery(dashboardTypes.FETCH_DASHBOARD_DATA, fetchDashboardData),
];
