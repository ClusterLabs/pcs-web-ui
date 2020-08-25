import {
  ApiResult,
  authGuiAgainstNodes,
  checkAuthAgainstNodes,
  existingCluster,
} from "app/backend";
import { AddClusterActions } from "app/store/actions";

import { call, put, race, take, takeEvery } from "./effects";
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
      cancel: take("ADD_CLUSTER.NODE_NAME.UPDATE"),
    });

    if (!result) {
      return;
    }

    if (!result.valid) {
      yield put({
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
      yield put({ type: "ADD_CLUSTER.CHECK_AUTH.OK" });
      return;
    }

    if (nodeStatus === "Offline") {
      yield put({
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
    yield put({ type: "ADD_CLUSTER.CHECK_AUTH.NO_AUTH" });
  } catch (error) {
    yield put({
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
    yield put({
      type: "ADD_CLUSTER.RELOAD_DASHBOARD",
    });
    yield put({ type: "DASHBOARD_DATA.REFRESH" });
    yield take("DASHBOARD_DATA.FETCH.SUCCESS");
    yield put({
      type: "ADD_CLUSTER.ADD_CLUSTER.SUCCESS",
      payload: { warningMessages: [] },
    });
  } catch (error) {
    yield put({
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
          dest_list: [{ addr: address, port }],
        },
      }),
      cancel: take("ADD_CLUSTER.NODE_NAME.UPDATE"),
    });

    if (!result) {
      return;
    }

    if (!result.valid) {
      yield put({
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

    yield put(
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
    yield put({
      type: "ADD_CLUSTER.AUTHENTICATE_NODE.FAILED",
      payload: { message: error.message },
    });
  }
}

export default [
  takeEvery("ADD_CLUSTER.CHECK_AUTH", checkAuthentication),
  takeEvery("ADD_CLUSTER.ADD_CLUSTER", addCluster),
  takeEvery("ADD_CLUSTER.AUTHENTICATE_NODE", authenticateNode),
];
