import {call, cancel, cancelled, fork, put, take} from "redux-saga/effects";
import {delay} from "redux-saga";

import * as api from "app/core/api.js"
import * as auth from "app/services/auth/sagas.js"
import * as notify from "app/scenes/notifications/actions.js";

import * as actions from "./actions"
import * as types from "./constants"

const SYNC_DELAY = 5 * 1000;//ms

export const transformClusterData = (apiData) => ({
  name: apiData.cluster_name,
  nodeList: apiData.node_list.map(node => ({
    name: node.name,
    status: node.status,
  })),
  resourceList: apiData.resource_list
    .filter(resource => ! resource.stonith)
    .map(resource => ({
      name: resource.id,
    }))
  ,
  stonithList: apiData.resource_list
    .filter(resource => resource.stonith)
    .map(stonith => ({
      name: stonith.id,
    }))
  ,
})

function* fetchClusterData(clusterName){
  const clusterData = yield call(
    auth.getJson,
    `/managec/${clusterName}/cluster_status`,
    {
      transform: transformClusterData,
    }
  )
  yield put(actions.fetchClusterDataSuccess(clusterData));
}

export function* clusterDataSync(clusterName){
  try{
    while(true){
      yield call(delay, SYNC_DELAY);
      yield put(actions.refreshClusterData(clusterName))
    }
  }finally{
    if (yield cancelled()){
      //console.log(`Sync data for '${clusterName}' cancelled`);
    }
  }
}

export function* clusterDataSyncManage(){
  let syncTask = null;

  while(true){
    const {payload: {clusterName}} = yield take(types.SYNC_CLUSTER_DATA);

    try{
      yield call(fetchClusterData, clusterName);
    }catch(error){
      yield put(actions.fetchClusterDataFailed(api.fail(error)));
    }

    syncTask = yield fork(clusterDataSync, clusterName)

    while(syncTask){
      let action = yield take([
        types.SYNC_CLUSTER_DATA,
        types.SYNC_CLUSTER_DATA_STOP,
        types.REFRESH_CLUSTER_DATA,
      ]);

      if(action.type === types.REFRESH_CLUSTER_DATA){
        try{
          yield call(fetchClusterData, clusterName);
        }catch(error){
          yield put(notify.error(
            `Cannot sync data for cluster '${clusterName}': ${error.message}`,
            {disappear: 2000}
          ))
        }
        continue;
      }

      yield cancel(syncTask)

      if(action.type === types.SYNC_CLUSTER_DATA){
        syncTask = yield fork(clusterDataSync, action.payload.clusterName)
      }

      if(action.type === types.SYNC_CLUSTER_DATA_STOP){
        syncTask = null;
      }
    }
  }
}

export default [
  fork(clusterDataSyncManage),
];
