import { ActionMap } from "app/store/actions";
import { clusterStart, clusterStop } from "app/backend";

import { api, processClusterResultBasic, takeEvery } from "./common";

function* nodeStart({
  payload: { nodeName, clusterUrlName },
}: ActionMap["NODE.START"]) {
  const result: api.ResultOf<typeof clusterStart> = yield api.authSafe(
    clusterStart,
    clusterUrlName,
    nodeName,
  );

  yield processClusterResultBasic(
    clusterUrlName,
    `start node ${nodeName}"`,
    result,
  );
}

function* nodeStop({
  payload: { nodeName, clusterUrlName },
}: ActionMap["NODE.STOP"]) {
  const result: api.ResultOf<typeof clusterStop> = yield api.authSafe(
    clusterStop,
    clusterUrlName,
    nodeName,
  );

  yield processClusterResultBasic(
    clusterUrlName,
    `stop node ${nodeName}"`,
    result,
  );
}

export default [
  takeEvery("NODE.START", nodeStart),
  takeEvery("NODE.STOP", nodeStop),
];
