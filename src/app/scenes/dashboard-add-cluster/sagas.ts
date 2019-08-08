import {
  call,
  put,
  race,
  take,
  takeEvery,
} from "redux-saga/effects";

import * as auth from "app/services/auth/sagas";
import { DashboardActionType } from "app/scenes/dashboard/types";
import * as DashboardAction from "app/scenes/dashboard/actions";

import { ClusterAddActionType } from "./types";
import * as ClusterAddAction from "./actions";

function* checkAuthentication(
  { payload: { nodeName } }: ClusterAddAction.CheckAuth,
) {
  try {
    const { nodesStatusMap } = yield race({
      nodesStatusMap: call(
        auth.getJson,
        "/manage/check_auth_against_nodes",
        { "node_list[]": nodeName },
      ),
      cancel: take(ClusterAddActionType.UPDATE_NODE_NAME),
    });

    if (nodesStatusMap) {
      const nodeStatus = nodesStatusMap[nodeName];
      if (nodeStatus === "Online") {
        yield put<ClusterAddAction.CheckAuthOk>({
          type: ClusterAddActionType.CHECK_AUTH_OK,
        });
        return;
      }
      if (nodeStatus === "Unable to authenticate") {
        yield put<ClusterAddAction.CheckAuthNoAuth>({
          type: ClusterAddActionType.CHECK_AUTH_NO_AUTH,
        });
        return;
      }
      if (nodeStatus === "Offline") {
        yield put<ClusterAddAction.CheckAuthError>({
          type: ClusterAddActionType.CHECK_AUTH_ERROR,
          payload: {
            message: (
              `Cannot connect to the node '${nodeName}'. Is the node online?`
            ),
          },
        });
        return;
      }
      yield put<ClusterAddAction.CheckAuthError>({
        type: ClusterAddActionType.CHECK_AUTH_ERROR,
        payload: {
          message: (
            `Unexpected backend response: '${JSON.stringify(nodesStatusMap)}'`
          ),
        },
      });
    }
  } catch (error) {
    yield put<ClusterAddAction.CheckAuthError>({
      type: ClusterAddActionType.CHECK_AUTH_ERROR,
      payload: {
        message: (
          `Error during communication with the backend: '${error.message}'`
        ),
      },
    });
  }
}

function* addCluster({ payload: { nodeName } }: ClusterAddAction.AddCluster) {
  try {
    yield call(
      auth.postForText,
      "/manage/existingcluster",
      { "node-name": nodeName },
    );
    yield put<ClusterAddAction.ReloadDashboard>({
      type: ClusterAddActionType.RELOAD_DASHBOARD,
    });
    yield put<DashboardAction.RefreshDashboardData>({
      type: DashboardActionType.REFRESH_DASHBOARD_DATA,
    });
    yield take(DashboardActionType.FETCH_DASHBOARD_DATA_SUCCESS);
    yield put<ClusterAddAction.AddClusterSuccess>({
      type: ClusterAddActionType.ADD_CLUSTER_SUCCESS,
      payload: { warningMessages: [] },
    });
  } catch (error) {
    yield put<ClusterAddAction.AddClusterError>({
      type: ClusterAddActionType.ADD_CLUSTER_ERROR,
      payload: {
        message: (
          error.name === "ApiBadStatus" && error.statusCode === 400
            ? error.body
            : error.message
        ),
      },
    });
  }
}

function* authenticateNode({
  payload,
}: ClusterAddAction.AuthenticateNode) {
  const {
    nodeName,
    password,
    address: addr,
    port,
  } = payload;

  try {
    const { authResult } = yield race({
      authResult: call(
        auth.postForText,
        "/manage/auth_gui_against_nodes",
        {
          data_json: JSON.stringify({
            nodes: {
              [nodeName]: {
                password,
                dest_list: [{ addr, port }],
              },
            },
          }),
        },
      ),
      cancel: take(ClusterAddActionType.UPDATE_NODE_NAME),
    });

    if (authResult) {
      const result = JSON.parse(authResult);
      if (
        result.node_auth_error === undefined
        ||
        result.node_auth_error[nodeName] === undefined
      ) {
        yield put<ClusterAddAction.AuthenticateNodeFailed>({
          type: ClusterAddActionType.AUTHENTICATE_NODE_FAILED,
          payload: {
            message: `Unexpected backend response: ${authResult}`,
          },
        });
        return;
      }

      yield put<
        | ClusterAddAction.AuthenticateNodeSuccess
        | ClusterAddAction.AuthenticateNodeFailed
      >(
        result.node_auth_error[nodeName] === 0
          ? { type: ClusterAddActionType.AUTHENTICATE_NODE_SUCCESS }
          : {
            type: ClusterAddActionType.AUTHENTICATE_NODE_FAILED,
            payload: {
              message: `Authentication of node '${nodeName}' failed.`,
            },
          }
        ,
      );
    }
  } catch (error) {
    yield put<ClusterAddAction.AuthenticateNodeFailed>({
      type: ClusterAddActionType.AUTHENTICATE_NODE_FAILED,
      payload: { message: error.message },
    });
  }
}

export default [
  takeEvery(ClusterAddActionType.CHECK_AUTH, checkAuthentication),
  takeEvery(ClusterAddActionType.ADD_CLUSTER, addCluster),
  takeEvery(ClusterAddActionType.AUTHENTICATE_NODE, authenticateNode),
];
