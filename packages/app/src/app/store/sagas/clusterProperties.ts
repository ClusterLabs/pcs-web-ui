import {
  getClusterPropertiesDefinition,
  updateClusterSettings,
} from "app/backend";
import type {ActionMap} from "app/store/actions";

import {api, processClusterResultBasic, put} from "./common";

export function* load({key}: ActionMap["CLUSTER.PROPERTIES.LOAD"]) {
  const result: api.ResultOf<typeof getClusterPropertiesDefinition> =
    yield api.authSafe(getClusterPropertiesDefinition, key.clusterName);

  const taskLabel = `load cluster properties of cluster ${key.clusterName}`;
  if (result.type !== "OK") {
    yield api.processError(result, taskLabel, {
      action: () =>
        put({
          type: "CLUSTER.PROPERTIES.LOAD.ERROR",
          key,
        }),
    });
    return;
  }

  yield put({
    type: "CLUSTER.PROPERTIES.LOAD.OK",
    key,
    payload: {apiClusterProperties: result.payload},
  });
}

export function* update({
  key: {clusterName},
  payload: {propertyMap},
}: ActionMap["CLUSTER.PROPERTIES.UPDATE"]) {
  const result: api.ResultOf<typeof updateClusterSettings> = yield api.authSafe(
    updateClusterSettings,
    {clusterName, settingsMap: propertyMap},
  );

  yield processClusterResultBasic(
    clusterName,
    "update cluster properties",
    result,
  );
}
