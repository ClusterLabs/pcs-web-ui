import {
  all,
  call,
  fork,
  put,
} from "redux-saga/effects";

import * as api from "app/core/api";
import * as auth from "app/services/auth/sagas";
import * as notify from "app/scenes/notifications/actions";
import { dataLoadManage } from "app/services/data-load/sagas";

import * as actions from "./actions";
import * as types from "./constants";

export const transformClusterData = apiData => ({
  name: apiData.cluster_name,
  nodeList: apiData.node_list.map(node => ({
    name: node.name,
    status: node.status,
  })),
  resourceList: apiData.resource_list
    .filter(resource => !resource.stonith)
    .map(resource => ({
      name: resource.id,
    })),
  stonithList: apiData.resource_list
    .filter(resource => resource.stonith)
    .map(stonith => ({
      name: stonith.id,
    }))
  ,
});

function* fetchClusterData(clusterName, onErrorAction) {
  try {
    const clusterData = yield call(
      auth.getJson,
      `/managec/${clusterName}/cluster_status`,
      {
        transform: transformClusterData,
      },
    );
    yield put(actions.fetchClusterDataSuccess(clusterData));
  } catch (error) {
    yield all(onErrorAction(error).map(action => put(action)));
  }
}

const getClusterDataSyncOptions = () => {
  let clusterName = "";
  /* eslint-disable prefer-destructuring */
  return {
    START: types.SYNC_CLUSTER_DATA,
    STOP: types.SYNC_CLUSTER_DATA_STOP,
    SUCCESS: types.FETCH_CLUSTER_DATA_SUCCESS,
    FAIL: types.FETCH_CLUSTER_DATA_FAILED,
    refreshAction: actions.refreshClusterData(),
    takeStartPayload: (payload) => { clusterName = payload.clusterName; },
    initFetch: () => fork(
      fetchClusterData,
      clusterName,
      error => [actions.fetchClusterDataFailed(api.fail(error))],
    ),
    fetch: () => fork(
      fetchClusterData,
      clusterName,
      error => [
        notify.error(
          `Cannot sync data for cluster '${clusterName}': ${error.message}`,
          { disappear: 2000 },
        ),
        actions.fetchClusterDataFailed(api.fail(error)),
      ],
    ),
  };
};

export default [
  fork(dataLoadManage, getClusterDataSyncOptions()),
];
