import {
  call,
  put,
  race,
  take,
  takeEvery,
} from "redux-saga/effects";

import * as auth from "app/services/auth/sagas";

import * as dashboardTypes from "app/scenes/dashboard/constants";
import { refreshDashboardData } from "app/scenes/dashboard/actions";

import { actionTypes } from "./constants";
import * as actions from "./actions";

function* checkAuthentication(action) {
  const nodeName = action.payload;
  try {
    const { nodesStatusMap } = yield race({
      nodesStatusMap: call(
        auth.getJson,
        "/manage/check_auth_against_nodes",
        {
          params: {
            "node_list[]": nodeName,
          },
        },
      ),
      cancel: take(actionTypes.UPDATE_NODE_NAME),
    });

    if (nodesStatusMap) {
      const nodeStatus = nodesStatusMap[nodeName];
      if (nodeStatus === "Online") {
        yield put(actions.checkAuthOk());
        return;
      }
      if (nodeStatus === "Unable to authenticate") {
        yield put(actions.checkAuthNoAuth());
        return;
      }
      if (nodeStatus === "Offline") {
        yield put(actions.checkAuthError(
          `Cannot connect to the node '${nodeName}'. Is the node online?`,
        ));
        return;
      }
      yield put(actions.checkAuthError(
        `Unexpected backend response: '${JSON.stringify(nodesStatusMap)}'`,
      ));
    }
  } catch (error) {
    yield put(actions.checkAuthError(
      `Error during communication with the backend: '${error.message}'`,
    ));
  }
}

function* addCluster(action) {
  try {
    const nodeName = action.payload;
    yield call(
      auth.postParamsForText,
      "/manage/existingcluster",
      {
        params: {
          "node-name": nodeName,
        },
      },
    );
    yield put(actions.reloadDashboard());
    yield put(refreshDashboardData());
    yield take(dashboardTypes.FETCH_DASHBOARD_DATA_SUCCESS);
    yield put(actions.addClusterSuccess([]));
  } catch (error) {
    if (error.name === "ApiBadStatus" && error.statusCode === 400) {
      yield put(actions.addClusterError([error.body]));
    } else {
      yield put(actions.addClusterError([error.message]));
    }
  }
}

function* authenticateNode(action) {
  const {
    nodeName,
    password,
    address: addr,
    port,
  } = action.payload;

  try {
    const { authResult } = yield race({
      authResult: call(
        auth.postParamsForText,
        "/manage/auth_gui_against_nodes",
        {
          params: {
            data_json: JSON.stringify({
              nodes: {
                [nodeName]: {
                  password,
                  dest_list: [{ addr, port }],
                },
              },
            }),
          },
        },
      ),
      cancel: take(actionTypes.UPDATE_NODE_NAME),
    });

    if (authResult) {
      const result = JSON.parse(authResult);
      if (
        result.node_auth_error === undefined
        ||
        result.node_auth_error[nodeName] === undefined
      ) {
        yield put(actions.authenticateNodeFailed(
          `Unexpected backend response: ${authResult}`,
        ));
        return;
      }

      yield put(
        result.node_auth_error[nodeName] === 0
          ? actions.authenticateNodeSuccess()
          : actions.authenticateNodeFailed(
            `Authentication of node '${nodeName}' failed.`,
          )
        ,
      );
    }
  } catch (error) {
    yield put(actions.authenticateNodeFailed([error.message]));
  }
}

export default [
  takeEvery(actionTypes.CHECK_AUTH, checkAuthentication),
  takeEvery(actionTypes.ADD_CLUSTER, addCluster),
  takeEvery(actionTypes.AUTHENTICATE_NODE, authenticateNode),
];
