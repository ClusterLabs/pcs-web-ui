import {call, put, takeEvery} from 'redux-saga/effects'
import * as router from 'connected-react-router'

import * as api from "app/core/api.js";
import * as auth from "app/services/auth/sagas.js"
import * as clusterActions from "app/services/cluster/actions.js";
import * as notify from "app/scenes/notifications/actions.js";

import * as actions from "./actions.js";
import * as types from "./constants";


export function* addNode({payload: {clusterName, nodeData}}){
  const notice = yield put(notify.info(`Checking node ${nodeData.name}.`))

  const checkResults = yield call(auth.getJson, "/manage/check_pcsd_status", {
    params: {
      nodes: nodeData.name,
      [`port-${nodeData.name}`]: nodeData.port,
    }
  });

  if(checkResults[nodeData.name] !== "Online"){
    yield put(actions.authRequired())
    return
  }

  yield put(notify.update(notice, {message: `Adding node ${nodeData.name}.`}));

  yield call(
    api.postParamsForText,
    `/managec/${clusterName}/add_node_to_cluster`,
    {
      new_nodename: nodeData.name,
      new_node_port: nodeData.port,
      auto_start: nodeData.autoOn,
    }
  );

  yield put(notify.toSuccess(notice, {
    message: `Node ${nodeData.name} has been added.`
  }));
  yield put(clusterActions.syncClusterData(clusterName))
  yield put(router.push(`/cluster/${clusterName}/nodes`))
}

export default [
  takeEvery(types.ADD_NODE, addNode),
];
