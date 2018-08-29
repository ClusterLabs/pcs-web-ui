import {call, put, takeEvery} from 'redux-saga/effects'
import {push} from 'connected-react-router'

import * as constants from "./constants";
import * as api from "../../services/api.js";
import * as actions from "./actions.js";
import * as clusterActions from "../../services/cluster/actions.js";
import * as notificationActions from "../../scenes/notifications/actions.js";


export function* addNode({payload: {clusterName, nodeData}}){
  const checkResponse = yield call(
    api.getForJson,
    "/manage/check_pcsd_status",
    {
      nodes: nodeData.name,
      [`port-${nodeData.name}`]: nodeData.port,
    }
  );

  if(checkResponse.data[nodeData.name] !== "Online"){
    yield put(actions.authRequired())
    return
  }

  const {payload: {id: notificationId}} = yield put(
    notificationActions.createWaiting(`Adding node ${nodeData.name}.`)
  )

  const addResponse = yield call(
    api.postParamsForText,
    `/managec/${clusterName}/add_node_to_cluster`,
    {
      new_nodename: nodeData.name,
      new_node_port: nodeData.port,
      auto_start: nodeData.autoOn,
    }
  );

  yield put(notificationActions.toSuccess(
    notificationId,
    `Node ${nodeData.name} has been added.`
  ))
  yield put(clusterActions.syncClusterData(clusterName))
  yield put(push(`/cluster/${clusterName}/nodes`))
}

export default [
  takeEvery(constants.ADD_NODE, addNode),
];
