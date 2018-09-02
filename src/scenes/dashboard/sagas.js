import {call, put, takeEvery} from 'redux-saga/effects'

import * as api from "~/services/api.js"
import {withAuthCare} from "~/scenes/login/sagas.js"

import * as dashboardActions from "./actions"
import * as dashboardTypes from "./constants"

export const transformDashboardData = (apiData) => ({
  clusterList: apiData.cluster_list.map(
    cluster => ({name: cluster.cluster_name})
  )
})

export function* fetchDashboardData(){
  const response = yield call(
    withAuthCare,
    api.getForJson,
    "/clusters_overview"
  )
  const dashboardData = yield call(transformDashboardData, response.data)
  yield put(dashboardActions.fetchDashboardDataSuccess(dashboardData));
}

export default [
  takeEvery(dashboardTypes.FETCH_DASHBOARD_DATA, fetchDashboardData),
];
