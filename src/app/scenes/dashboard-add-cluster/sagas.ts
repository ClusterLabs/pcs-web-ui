import {
  call,
  put,
  race,
  take,
  takeEvery,
} from "redux-saga/effects";

import { typeIs } from "app/common/utils";
import * as auth from "app/services/auth/sagas";
import * as DashboardAction from "app/scenes/dashboard/actions";

import * as ClusterAddAction from "./actions";

const UpdateNodeNameActionType:ClusterAddAction.UpdateNodeName["type"] = (
  "ADD_CLUSTER.NODE_NAME.UPDATE"
);

function* checkAuthentication(
  { payload: { nodeName } }: ClusterAddAction.CheckAuth,
) {
  try {
    const { nodesStatusMap } = yield race({
      nodesStatusMap: call(
        auth.getJson,
        "/manage/check_auth_against_nodes",
        [["node_list[]", nodeName]],
      ),
      cancel: take(UpdateNodeNameActionType),
    });

    if (nodesStatusMap) {
      const nodeStatus = nodesStatusMap[nodeName];
      if (nodeStatus === "Online") {
        yield put<ClusterAddAction.CheckAuthOk>({
          type: "ADD_CLUSTER.CHECK_AUTH.OK",
        });
        return;
      }
      if (nodeStatus === "Unable to authenticate") {
        yield put<ClusterAddAction.CheckAuthNoAuth>({
          type: "ADD_CLUSTER.CHECK_AUTH.NO_AUTH",
        });
        return;
      }
      if (nodeStatus === "Offline") {
        yield put<ClusterAddAction.CheckAuthError>({
          type: "ADD_CLUSTER.CHECK_AUTH.ERROR",
          payload: {
            message: (
              `Cannot connect to the node '${nodeName}'. Is the node online?`
            ),
          },
        });
        return;
      }
      yield put<ClusterAddAction.CheckAuthError>({
        type: "ADD_CLUSTER.CHECK_AUTH.ERROR",
        payload: {
          message: (
            `Unexpected backend response: '${JSON.stringify(nodesStatusMap)}'`
          ),
        },
      });
    }
  } catch (error) {
    yield put<ClusterAddAction.CheckAuthError>({
      type: "ADD_CLUSTER.CHECK_AUTH.ERROR",
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
      [["node-name", nodeName]],
    );
    yield put<ClusterAddAction.ReloadDashboard>({
      type: "ADD_CLUSTER.RELOAD_DASHBOARD",
    });
    yield put<DashboardAction.RefreshDashboardData>({
      type: "DASHBOARD_DATA.REFRESH",
    });
    const fetchSuccess: DashboardAction.FetchDashboardDataSuccess["type"] = (
      "DASHBOARD_DATA.FETCH.SUCCESS"
    );
    yield take(fetchSuccess);
    yield put<ClusterAddAction.AddClusterSuccess>({
      type: "ADD_CLUSTER.ADD_CLUSTER.SUCCESS",
      payload: { warningMessages: [] },
    });
  } catch (error) {
    yield put<ClusterAddAction.AddClusterError>({
      type: "ADD_CLUSTER.ADD_CLUSTER.ERROR",
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
        [
          ["data_json", JSON.stringify({
            nodes: {
              [nodeName]: {
                password,
                dest_list: [{ addr, port }],
              },
            },
          })],
        ],
      ),
      cancel: take(UpdateNodeNameActionType),
    });

    if (authResult) {
      const result = JSON.parse(authResult);
      if (
        result.node_auth_error === undefined
        ||
        result.node_auth_error[nodeName] === undefined
      ) {
        yield put<ClusterAddAction.AuthenticateNodeFailed>({
          type: "ADD_CLUSTER.AUTHENTICATE_NODE.FAILED",
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
          ? { type: "ADD_CLUSTER.AUTHENTICATE_NODE.SUCCESS" }
          : {
            type: "ADD_CLUSTER.AUTHENTICATE_NODE.FAILED",
            payload: {
              message: `Authentication of node '${nodeName}' failed.`,
            },
          }
        ,
      );
    }
  } catch (error) {
    yield put<ClusterAddAction.AuthenticateNodeFailed>({
      type: "ADD_CLUSTER.AUTHENTICATE_NODE.FAILED",
      payload: { message: error.message },
    });
  }
}

export default [
  takeEvery(
    typeIs<ClusterAddAction.CheckAuth["type"]>("ADD_CLUSTER.CHECK_AUTH"),
    checkAuthentication,
  ),
  takeEvery(
    typeIs<ClusterAddAction.AddCluster["type"]>("ADD_CLUSTER.ADD_CLUSTER"),
    addCluster,
  ),
  takeEvery(
    typeIs<ClusterAddAction.AuthenticateNode["type"]>(
      "ADD_CLUSTER.AUTHENTICATE_NODE",
    ),
    authenticateNode,
  ),
];
