import {
  call,
  put,
  race,
  take,
  takeEvery,
} from "redux-saga/effects";

import { typeIs } from "app/common/utils";
import * as DashboardAction from "app/scenes/dashboard/actions";
import { existingCluster } from "app/common/backend/existingCluster";
import {
  checkAuthAgainstNodes,
  CheckAuthAgainstNodesResult,
} from "app/common/backend/checkAuthAgainstNodes";
import { ApiCallResult } from "app/common/backend/result";

import {
  authGuiAgainstNodes,
  AuthGuiAgainstNodesResult,
} from "app/common/backend/authGuiAgainstNodes";

import * as ClusterAddAction from "./actions";

const UpdateNodeNameActionType:ClusterAddAction.UpdateNodeName["type"] = (
  "ADD_CLUSTER.NODE_NAME.UPDATE"
);

function* checkAuthentication(
  { payload: { nodeName } }: ClusterAddAction.CheckAuth,
) {
  try {
    const { result, cancel }: {
      result: ApiCallResult<CheckAuthAgainstNodesResult>,
      cancel: any,
    } = yield race({
      result: call(checkAuthAgainstNodes, [nodeName]),
      cancel: take(UpdateNodeNameActionType),
    });

    if (cancel) {
      return;
    }

    if (!result.valid) {
      yield put<ClusterAddAction.CheckAuthError>({
        type: "ADD_CLUSTER.CHECK_AUTH.ERROR",
        payload: {
          message: ([
            "Unexpected backend response:",
            `'${JSON.stringify(result.raw)}'`,
            "errors:",
            result.errors,
          ].join("\n")),
        },
      });
      return;
    }

    const nodeStatus = result.response[nodeName];
    if (nodeStatus === "Online") {
      yield put<ClusterAddAction.CheckAuthOk>({
        type: "ADD_CLUSTER.CHECK_AUTH.OK",
      });
    } else if (nodeStatus === "Offline") {
      yield put<ClusterAddAction.CheckAuthError>({
        type: "ADD_CLUSTER.CHECK_AUTH.ERROR",
        payload: {
          message: (
            `Cannot connect to the node '${nodeName}'. Is the node online?`
          ),
        },
      });
    } else { // Unable to authenticate
      yield put<ClusterAddAction.CheckAuthNoAuth>({
        type: "ADD_CLUSTER.CHECK_AUTH.NO_AUTH",
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
    yield call(existingCluster, nodeName);
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
    address,
    port,
  } = payload;

  try {
    const { result, cancel }: {
      result: ApiCallResult<AuthGuiAgainstNodesResult>,
      cancel: any,
    } = yield race({
      result: call(authGuiAgainstNodes, {
        [nodeName]: {
          password,
          dest_list: [{ addr: address, port }],
        },
      }),
      cancel: take(UpdateNodeNameActionType),
    });

    if (cancel) {
      return;
    }

    if (!result.valid) {
      yield put<ClusterAddAction.AuthenticateNodeFailed>({
        type: "ADD_CLUSTER.AUTHENTICATE_NODE.FAILED",
        payload: {
          message: (
            `Unexpected backend response:\n${result.raw}\n`
              + `errors:\n ${result.errors}`
          ),
        },
      });
    } else {
      yield put<
        | ClusterAddAction.AuthenticateNodeSuccess
        | ClusterAddAction.AuthenticateNodeFailed
      >(
        result.response.node_auth_error[nodeName] === 0
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
