import { resourceClone, resourceUnclone } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, processClusterResultBasic } from "./common";

export function* clone({
  key,
  payload: { resourceId },
}: ActionMap["RESOURCE.CLONE"]) {
  const result: api.ResultOf<typeof resourceClone> = yield api.authSafe(
    resourceClone,
    key.clusterName,
    resourceId,
  );

  yield processClusterResultBasic(
    key.clusterName,
    `clone ${resourceId}`,
    result,
  );
}

export function* unclone({
  key,
  payload: { resourceId },
}: ActionMap["RESOURCE.UNCLONE"]) {
  const result: api.ResultOf<typeof resourceUnclone> = yield api.authSafe(
    resourceUnclone,
    key.clusterName,
    resourceId,
  );

  yield processClusterResultBasic(
    key.clusterName,
    `unclone ${resourceId}`,
    result,
  );
}
