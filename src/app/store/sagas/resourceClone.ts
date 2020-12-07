import { resourceClone, resourceUnclone } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, processClusterResultBasic, takeEvery } from "./common";

function* clone({
  payload: { resourceId, clusterUrlName },
}: ActionMap["RESOURCE.CLONE"]) {
  const result: api.ResultOf<typeof resourceClone> = yield api.authSafe(
    resourceClone,
    clusterUrlName,
    resourceId,
  );

  yield processClusterResultBasic(
    clusterUrlName,
    `clone ${resourceId}`,
    result,
  );
}

function* unclone({
  payload: { resourceId, clusterUrlName },
}: ActionMap["RESOURCE.UNCLONE"]) {
  const result: api.ResultOf<typeof resourceUnclone> = yield api.authSafe(
    resourceUnclone,
    clusterUrlName,
    resourceId,
  );

  yield processClusterResultBasic(
    clusterUrlName,
    `unclone ${resourceId}`,
    result,
  );
}

export default [
  takeEvery("RESOURCE.CLONE", clone),
  takeEvery("RESOURCE.UNCLONE", unclone),
];
