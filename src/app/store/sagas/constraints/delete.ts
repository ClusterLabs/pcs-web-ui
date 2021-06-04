import { removeConstraintRemote } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, processClusterResultBasic } from "../common";

type RemoveConstraintRemoteResult = api.ResultOf<typeof removeConstraintRemote>;
export function* deleteConstraint({
  key: { clusterName },
  payload: { constraintId },
}: ActionMap["CONSTRAINT.DELETE"]) {
  const result: RemoveConstraintRemoteResult = yield api.authSafe(
    removeConstraintRemote,
    {
      clusterName,
      constraintId,
    },
  );

  yield processClusterResultBasic(
    clusterName,
    `delete constraint ${constraintId}`,
    result,
  );
}
