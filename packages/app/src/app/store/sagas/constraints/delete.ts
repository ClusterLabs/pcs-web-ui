import {removeConstraintRemote, removeConstraintRuleRemote} from "app/backend";
import type {ActionMap} from "app/store/actions";

import {api, processClusterResultBasic} from "../common";

type RemoveConstraintRemoteResult = api.ResultOf<typeof removeConstraintRemote>;
export function* deleteConstraint({
  key: {clusterName},
  payload: {constraintId},
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

type RemoveConstraintRuleRemoteResult = api.ResultOf<
  typeof removeConstraintRuleRemote
>;
export function* deleteConstraintRule({
  key: {clusterName},
  payload: {ruleId},
}: ActionMap["CONSTRAINT.DELETE.RULE"]) {
  const result: RemoveConstraintRuleRemoteResult = yield api.authSafe(
    removeConstraintRuleRemote,
    {
      clusterName,
      ruleId,
    },
  );

  yield processClusterResultBasic(
    clusterName,
    `delete constraint rule ${ruleId}`,
    result,
  );
}
