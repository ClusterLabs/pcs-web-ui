import {removeConstraintRemote, removeConstraintRuleRemote} from "app/backend";
import type {ActionMap} from "app/store/actions";

import {api, processClusterResultBasic} from "../common";

type RemoveConstraintRemoteResult = api.ResultOf<typeof removeConstraintRemote>;
export function* deleteConstraint({
  payload: {constraintId},
}: ActionMap["CONSTRAINT.DELETE"]) {
  const result: RemoveConstraintRemoteResult = yield api.authSafe(
    removeConstraintRemote,
    {constraintId},
  );

  yield processClusterResultBasic(`delete constraint ${constraintId}`, result);
}

type RemoveConstraintRuleRemoteResult = api.ResultOf<
  typeof removeConstraintRuleRemote
>;
export function* deleteConstraintRule({
  payload: {ruleId},
}: ActionMap["CONSTRAINT.DELETE.RULE"]) {
  const result: RemoveConstraintRuleRemoteResult = yield api.authSafe(
    removeConstraintRuleRemote,
    {ruleId},
  );

  yield processClusterResultBasic(`delete constraint rule ${ruleId}`, result);
}
