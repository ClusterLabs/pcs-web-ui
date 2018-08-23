import {call, cancel, cancelled, fork, put, take} from "redux-saga/effects";
import {delay} from "redux-saga";

import {withAuthCare} from "../../scenes/login/sagas.js"

import * as clusterActions from "./actions"
import * as clusterTypes from "./constants"
import * as api from "../api.js"

const SYNC_DELAY = 20 * 1000;//ms

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

export function* clusterDataSync(clusterName){
  try {
    while(true){
      const response = yield call(
        withAuthCare,
        api.getForJson,
        `/managec/${clusterName}/cluster_status`,
      )
      const clusterData = yield call(transformClusterData, response.data)
      yield put(clusterActions.fetchClusterDataSuccess(clusterData));
      yield call(delay, SYNC_DELAY);
    }
  } finally {
    if (yield cancelled()){
      //console.log(`Sync data for '${clusterName}' cancelled`);
    }
  }
}

export function* clusterDataSyncManage(){
  let action = yield take(clusterTypes.SYNC_CLUSTER_DATA);
  let syncTask = yield fork(clusterDataSync, action.payload.clusterName)

  while(true){
    let action = yield take([
      clusterTypes.SYNC_CLUSTER_DATA,
      clusterTypes.SYNC_CLUSTER_DATA_STOP,
    ]);
    yield cancel(syncTask)
    if(action.type === clusterTypes.SYNC_CLUSTER_DATA){
      syncTask = yield fork(clusterDataSync, action.payload.clusterName)
    }
  }
}

export default [
  fork(clusterDataSyncManage),
];
