import { resourceClone, resourceUnclone } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, processClusterResultBasic, takeEvery } from "./common";

function* clone({ id, payload: { resourceId } }: ActionMap["RESOURCE.CLONE"]) {
  const result: api.ResultOf<typeof resourceClone> = yield api.authSafe(
    resourceClone,
    id.cluster,
    resourceId,
  );

  yield processClusterResultBasic(id.cluster, `clone ${resourceId}`, result);
}

function* unclone({
  id,
  payload: { resourceId },
}: ActionMap["RESOURCE.UNCLONE"]) {
  const result: api.ResultOf<typeof resourceUnclone> = yield api.authSafe(
    resourceUnclone,
    id.cluster,
    resourceId,
  );

  yield processClusterResultBasic(id.cluster, `unclone ${resourceId}`, result);
}

export default [
  takeEvery("RESOURCE.CLONE", clone),
  takeEvery("RESOURCE.UNCLONE", unclone),
];
