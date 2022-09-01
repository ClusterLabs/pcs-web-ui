import { clusterStart, clusterStop } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, processClusterResultBasic } from "./common";

export function* nodeStart({
  key,
  payload: { nodeName },
}: ActionMap["NODE.START"]) {
  const result: api.ResultOf<typeof clusterStart> = yield api.authSafe(
    clusterStart,
    key.clusterName,
    nodeName,
  );

  yield processClusterResultBasic(
    key.clusterName,
    `start node "${nodeName}"`,
    result,
  );
}

export function* nodeStop({
  key,
  payload: { nodeName },
}: ActionMap["NODE.STOP"]) {
  const result: api.ResultOf<typeof clusterStop> = yield api.authSafe(
    clusterStop,
    key.clusterName,
    nodeName,
  );

  yield processClusterResultBasic(
    key.clusterName,
    `stop node ${nodeName}"`,
    result,
  );
}
