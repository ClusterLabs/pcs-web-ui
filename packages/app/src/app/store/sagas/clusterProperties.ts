import {
  getClusterPropertiesDefinition,
  updateClusterSettings,
} from "app/backend";
import type {ActionMap} from "app/store/actions";

import {api, errorMessage, log, put} from "./common";
import {stripForceText} from "./clusterStopUtils";

export function* load() {
  const result: api.ResultOf<typeof getClusterPropertiesDefinition> =
    yield api.authSafe(getClusterPropertiesDefinition);

  const taskLabel = "load cluster properties";
  if (result.type !== "OK") {
    yield api.processError(result, taskLabel, {
      action: () => put({type: "CLUSTER.PROPERTIES.LOAD.ERROR"}),
    });
    return;
  }

  yield put({
    type: "CLUSTER.PROPERTIES.LOAD.OK",
    payload: {apiClusterProperties: result.payload},
  });
}

export function* update({
  payload: {propertyMap, force},
}: ActionMap["CLUSTER.PROPERTIES.UPDATE"]) {
  const result: api.ResultOf<typeof updateClusterSettings> = yield api.authSafe(
    updateClusterSettings,
    {settingsMap: propertyMap, force},
  );

  const taskLabel = "update cluster properties";
  if (result.type !== "OK") {
    if (result.type !== "BAD_HTTP_STATUS") {
      log.error(result, taskLabel);
    }
    yield put({
      type: "CLUSTER.PROPERTIES.UPDATE.FAIL",
      payload: {
        message: errorMessage(stripForceText(result), taskLabel),
        isForceable: "text" in result && result.text.includes("--force"),
      },
    });
    return;
  }

  yield put({type: "CLUSTER.STATUS.REFRESH"});

  yield put({type: "CLUSTER.PROPERTIES.UPDATE.OK"});
}
