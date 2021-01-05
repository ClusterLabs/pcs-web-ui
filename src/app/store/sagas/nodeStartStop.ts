import { ActionMap } from "app/store/actions";
import { clusterStart, clusterStop } from "app/backend";

import { api, processClusterResultBasic, takeEvery } from "./common";

function* nodeStart({ id, payload: { nodeName } }: ActionMap["NODE.START"]) {
  const result: api.ResultOf<typeof clusterStart> = yield api.authSafe(
    clusterStart,
    id.cluster,
    nodeName,
  );

  yield processClusterResultBasic(
    id.cluster,
    `start node ${nodeName}"`,
    result,
  );
}

function* nodeStop({ id, payload: { nodeName } }: ActionMap["NODE.STOP"]) {
  const result: api.ResultOf<typeof clusterStop> = yield api.authSafe(
    clusterStop,
    id.cluster,
    nodeName,
  );

  yield processClusterResultBasic(id.cluster, `stop node ${nodeName}"`, result);
}

export default [
  takeEvery("NODE.START", nodeStart),
  takeEvery("NODE.STOP", nodeStop),
];
