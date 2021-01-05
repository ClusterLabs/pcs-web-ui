import { clusterProperties } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, put, takeEvery } from "./common";

function* loadClusterProperties({ id }: ActionMap["CLUSTER.PROPERTIES.LOAD"]) {
  const result: api.ResultOf<typeof clusterProperties> = yield api.authSafe(
    clusterProperties,
    id.cluster,
  );

  const taskLabel = `load cluster properties of cluster ${id.cluster}`;
  if (result.type !== "OK") {
    yield api.processError(result, taskLabel, {
      action: () =>
        put({
          type: "CLUSTER.PROPERTIES.LOAD.ERROR",
          id,
        }),
    });
    return;
  }

  yield put({
    type: "CLUSTER.PROPERTIES.LOAD.OK",
    id,
    payload: { apiClusterProperties: result.payload },
  });
}
export default [takeEvery("CLUSTER.PROPERTIES.LOAD", loadClusterProperties)];
