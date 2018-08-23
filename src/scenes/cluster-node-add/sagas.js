import {call, put, takeEvery} from 'redux-saga/effects'
import {push} from 'connected-react-router'

import * as constants from "./constants";
import * as api from "../../services/api.js";
import * as actions from "./actions.js";
import * as clusterActions from "../../services/cluster/actions.js";


export function* addNode({payload: {clusterName, nodeData}}){
  const checkResponse = yield call(
    api.getForJson,
    "/manage/check_pcsd_status",
    {
      nodes: nodeData.name,
      [`port-${nodeData.name}`]: nodeData.port,
    }
  );
  console.log("CHECK_RESPONSE");
  console.log(checkResponse);
  console.log(checkResponse);
  if(checkResponse.data[nodeData.name] !== "Online"){
    yield put(actions.authRequired())
  }else{
    const addResponse = yield call(
      api.postParamsForText,
      `/managec/${clusterName}/add_node_to_cluster`,
      {
        new_nodename: nodeData.name,
        new_node_port: nodeData.port,
        auto_start: nodeData.autoOn,
      }
    );
    yield put(clusterActions.syncClusterData(clusterName))
    yield put(push(`/cluster/${clusterName}/nodes`))
  }
}

export default [
  takeEvery(constants.ADD_NODE, addNode),
];
