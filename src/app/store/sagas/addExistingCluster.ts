import { call, put, race, take, takeEvery } from "redux-saga/effects";

import {
  ApiResult,
  authGuiAgainstNodes,
  checkAuthAgainstNodes,
  existingCluster,
} from "app/backend";
import { Action, AddClusterActions, actionType } from "app/store/actions";

import { authSafe } from "./authSafe";

function* checkAuthentication({
  payload: { nodeName },
}: AddClusterActions["CheckAuth"]) {
  try {
    const {
      result,
    }: {
      result: ApiResult<typeof checkAuthAgainstNodes>;
    } = yield race({
      result: call(authSafe(checkAuthAgainstNodes), [nodeName]),
      cancel: take(actionType("ADD_CLUSTER.NODE_NAME.UPDATE")),
    });

    if (!result) {
      return;
    }

    if (!result.valid) {
      yield put<Action>({
        type: "ADD_CLUSTER.CHECK_AUTH.ERROR",
        payload: {
          message: [
            "Unexpected backend response:",
            `'${JSON.stringify(result.raw)}'`,
            "errors:",
            result.errors,
          ].join("\n"),
        },
      });
      return;
    }

    const nodeStatus = result.response[nodeName];
    if (nodeStatus === "Online") {
      yield put<Action>({ type: "ADD_CLUSTER.CHECK_AUTH.OK" });
      return;
    }

    if (nodeStatus === "Offline") {
      yield put<Action>({
        type: "ADD_CLUSTER.CHECK_AUTH.ERROR",
        payload: {
          // prettier-ignore
          message: (
            `Cannot connect to the node '${nodeName}'. Is the node online?`
          ),
        },
      });
      return;
    }

    // Unable to authenticate
    yield put<Action>({ type: "ADD_CLUSTER.CHECK_AUTH.NO_AUTH" });
  } catch (error) {
    yield put<Action>({
      type: "ADD_CLUSTER.CHECK_AUTH.ERROR",
      payload: {
        // prettier-ignore
        message: (
          `Error during communication with the backend: '${error.message}'`
        ),
      },
    });
  }
}

function* addCluster({
  payload: { nodeName },
}: AddClusterActions["AddCluster"]) {
  try {
    yield call(authSafe(existingCluster), nodeName);
    yield put<Action>({
      type: "ADD_CLUSTER.RELOAD_DASHBOARD",
    });
    yield put<Action>({ type: "DASHBOARD_DATA.REFRESH" });
    yield take(actionType("DASHBOARD_DATA.FETCH.SUCCESS"));
    yield put<Action>({
      type: "ADD_CLUSTER.ADD_CLUSTER.SUCCESS",
      payload: { warningMessages: [] },
    });
  } catch (error) {
    yield put<Action>({
      type: "ADD_CLUSTER.ADD_CLUSTER.ERROR",
      payload: {
        message:
          error.name === "ApiBadStatus" && error.statusCode === 400
            ? error.body
            : error.message,
      },
    });
  }
}

function* authenticateNode({
  payload: { nodeName, password, address, port },
}: AddClusterActions["AuthenticateNode"]) {
  try {
    const {
      result,
    }: {
      result: ApiResult<typeof authGuiAgainstNodes>;
    } = yield race({
      result: call(authSafe(authGuiAgainstNodes), {
        [nodeName]: {
          password,
          /* eslint-disable @typescript-eslint/camelcase */
          dest_list: [{ addr: address, port }],
        },
      }),
      cancel: take(actionType("ADD_CLUSTER.NODE_NAME.UPDATE")),
    });

    if (!result) {
      return;
    }

    if (!result.valid) {
      yield put<Action>({
        type: "ADD_CLUSTER.AUTHENTICATE_NODE.FAILED",
        payload: {
          // prettier-ignore
          message: (
            `Unexpected backend response:\n${result.raw}\n`
            + `errors:\n ${result.errors}`
          ),
        },
      });
      return;
    }

    yield put<Action>(
      result.response.node_auth_error[nodeName] === 0
        ? { type: "ADD_CLUSTER.AUTHENTICATE_NODE.SUCCESS" }
        : {
          type: "ADD_CLUSTER.AUTHENTICATE_NODE.FAILED",
          payload: {
            message: `Authentication of node '${nodeName}' failed.`,
          },
        },
    );
  } catch (error) {
    yield put<Action>({
      type: "ADD_CLUSTER.AUTHENTICATE_NODE.FAILED",
      payload: { message: error.message },
    });
  }
}

export default [
  takeEvery(actionType("ADD_CLUSTER.CHECK_AUTH"), checkAuthentication),
  takeEvery(actionType("ADD_CLUSTER.ADD_CLUSTER"), addCluster),
  takeEvery(actionType("ADD_CLUSTER.AUTHENTICATE_NODE"), authenticateNode),
];
