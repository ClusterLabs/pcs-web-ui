import {
  call,
  put,
  race,
  take,
  takeEvery,
} from "redux-saga/effects";

import * as auth from "app/services/auth/sagas";
import { DashboardActionType } from "app/scenes/dashboard/types";

import { actionTypes } from "./types";

const {
  ADD_CLUSTER,
  ADD_CLUSTER_ERROR,
  ADD_CLUSTER_SUCCESS,
  AUTHENTICATE_NODE,
  AUTHENTICATE_NODE_SUCCESS,
  AUTHENTICATE_NODE_FAILED,
  CHECK_AUTH,
  CHECK_AUTH_ERROR,
  CHECK_AUTH_NO_AUTH,
  CHECK_AUTH_OK,
  RELOAD_DASHBOARD,
  UPDATE_NODE_NAME,
} = actionTypes;

function* checkAuthentication(action) {
  const { nodeName } = action.payload;
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
      cancel: take(UPDATE_NODE_NAME),
    });

    if (nodesStatusMap) {
      const nodeStatus = nodesStatusMap[nodeName];
      if (nodeStatus === "Online") {
        yield put({ type: CHECK_AUTH_OK });
        return;
      }
      if (nodeStatus === "Unable to authenticate") {
        yield put({ type: CHECK_AUTH_NO_AUTH });
        return;
      }
      if (nodeStatus === "Offline") {
        yield put({
          type: CHECK_AUTH_ERROR,
          payload: {
            message: (
              `Cannot connect to the node '${nodeName}'. Is the node online?`
            ),
          },
        });
        return;
      }
      yield put({
        type: CHECK_AUTH_ERROR,
        payload: {
          message: (
            `Unexpected backend response: '${JSON.stringify(nodesStatusMap)}'`
          ),
        },
      });
    }
  } catch (error) {
      yield put({
        type: CHECK_AUTH_ERROR,
        payload: {
          message: (
            `Error during communication with the backend: '${error.message}'`
          ),
        },
      });
  }
}

function* addCluster(action) {
  try {
    const nodeName = action.payload.nodeName;
    yield call(
      auth.postParamsForText,
      "/manage/existingcluster",
      {
        params: {
          "node-name": nodeName,
        },
      },
    );
    yield put({ type: RELOAD_DASHBOARD });
    yield put({ type: DashboardActionType.REFRESH_DASHBOARD_DATA });
    yield take(DashboardActionType.FETCH_DASHBOARD_DATA_SUCCESS);
    yield put({
      type: ADD_CLUSTER_SUCCESS,
      payload: { warningMessages: [] },
    });
  } catch (error) {
    yield put({
      type: ADD_CLUSTER_ERROR,
      payload: {
        message: (
          error.name === "ApiBadStatus" && error.statusCode === 400
            ? error.body
            : error.message
        ),
      }
    })
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
      cancel: take(UPDATE_NODE_NAME),
    });

    if (authResult) {
      const result = JSON.parse(authResult);
      if (
        result.node_auth_error === undefined
        ||
        result.node_auth_error[nodeName] === undefined
      ) {
        yield put({
          type: AUTHENTICATE_NODE_FAILED,
          payload: {
            message: `Unexpected backend response: ${authResult}`,
          },
        });
        return;
      }

      yield put(
        result.node_auth_error[nodeName] === 0
          ? { type: AUTHENTICATE_NODE_SUCCESS }
          : {
              type: AUTHENTICATE_NODE_FAILED,
              payload: {
                message: `Authentication of node '${nodeName}' failed.`,
              },
            }
        ,
      );
    }
  } catch (error) {
    yield put({
      type: AUTHENTICATE_NODE_FAILED,
      payload: { message: error.message },
    });
  }
}

export default [
  takeEvery(CHECK_AUTH, checkAuthentication),
  takeEvery(ADD_CLUSTER, addCluster),
  takeEvery(AUTHENTICATE_NODE, authenticateNode),
];
