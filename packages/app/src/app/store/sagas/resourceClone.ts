import {resourceClone, resourceUnclone} from "app/backend";
import type {ActionMap} from "app/store/actions";

import {api, processClusterResultBasic} from "./common";

export function* clone({payload: {resourceId}}: ActionMap["RESOURCE.CLONE"]) {
  const result: api.ResultOf<typeof resourceClone> = yield api.authSafe(
    resourceClone,
    resourceId,
  );

  yield processClusterResultBasic(`clone ${resourceId}`, result);
}

export function* unclone({
  payload: {resourceId},
}: ActionMap["RESOURCE.UNCLONE"]) {
  const result: api.ResultOf<typeof resourceUnclone> = yield api.authSafe(
    resourceUnclone,
    resourceId,
  );

  yield processClusterResultBasic(`unclone ${resourceId}`, result);
}
