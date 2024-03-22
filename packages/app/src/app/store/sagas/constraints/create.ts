import {addConstraintRemote, addConstraintRuleRemote} from "app/backend";
import {ActionMap} from "app/store";
import {api, put} from "app/store/sagas/common";

export function* create({key, payload}: ActionMap["CONSTRAINT.SINGLE.CREATE"]) {
  const backendCall =
    "locationSpecification" in payload
    && payload.locationSpecification === "rule"
      ? api.authSafe(addConstraintRuleRemote, {
          clusterName: key.clusterName,
          constraint: payload.constraint,
        })
      : api.authSafe(addConstraintRemote, {
          clusterName: key.clusterName,
          constraint: payload.constraint,
        });

  const result: api.ResultOf<
    typeof addConstraintRemote | typeof addConstraintRuleRemote
  > = yield backendCall;

  if (result.type === "OK") {
    yield put({
      type: "CONSTRAINT.SINGLE.CREATE.OK",
      key,
    });
    yield put({type: "CLUSTER.STATUS.REFRESH", key});
    return;
  }

  yield put({
    type: "CONSTRAINT.SINGLE.CREATE.FAIL",
    key,
    payload: {
      message: api.getNonOkMessage(result),
    },
  });
}
