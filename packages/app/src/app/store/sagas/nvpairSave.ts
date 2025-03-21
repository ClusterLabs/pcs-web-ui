import {
  addMetaAttrRemote,
  addNodeAttrRemote,
  setNodeUtilization,
  setResourceUtilization,
} from "app/backend";
import type {ActionMap} from "app/store/actions";
import {getNVPairTypeLabel, labelize} from "app/store/tools";

import {api, processError, put, putNotification} from "./common";

type SaveAction = ActionMap["CLUSTER.NVPAIRS.SAVE"];

type ApiResult =
  | api.ResultOf<typeof setNodeUtilization>
  | api.ResultOf<typeof setResourceUtilization>;

function* processRemoveResult(result: ApiResult, attrType: string) {
  if (result.type !== "OK") {
    yield processError(result, `remove ${attrType} attribute`);
    return;
  }
  yield putNotification("SUCCESS", `${labelize(attrType)} attribute removed`);
}

function* processEditResult(result: ApiResult) {
  const taskLabel = "edit utilization attribute";
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      useNotification: false,
      action: () =>
        put({
          type: "CLUSTER.NVPAIRS.SAVE.ERROR",
          payload: {
            message: api.errorMessage(result, taskLabel),
          },
        }),
    });
    return;
  }

  yield put({
    type: "CLUSTER.NVPAIRS.SAVE.OK",
  });
}

export function* nvpairSave({key, payload: {name, value, owner}}: SaveAction) {
  let result: ApiResult;

  if (owner.type === "resource-utilization") {
    result = yield api.authSafe(setResourceUtilization, {
      clusterName: key.clusterName,
      resourceId: owner.id,
      name,
      value,
    });
  } else if (owner.type === "resource-meta") {
    result = yield api.authSafe(addMetaAttrRemote, {
      clusterName: key.clusterName,
      resourceId: owner.id,
      name,
      value,
    });
  } else if (owner.type === "node-attr") {
    result = yield api.authSafe(addNodeAttrRemote, {
      clusterName: key.clusterName,
      nodeName: owner.id,
      name,
      value,
    });
  } else {
    result = yield api.authSafe(setNodeUtilization, {
      clusterName: key.clusterName,
      nodeName: owner.id,
      name,
      value,
    });
  }

  if (value.length === 0) {
    yield processRemoveResult(result, getNVPairTypeLabel(owner));
    yield put({type: "CLUSTER.NVPAIRS.EDIT.CLOSE", key});
  } else {
    yield processEditResult(result);
  }

  yield put({type: "CLUSTER.STATUS.REFRESH", key});
}
