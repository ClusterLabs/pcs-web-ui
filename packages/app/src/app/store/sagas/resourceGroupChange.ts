import {resourceChangeGroup} from "app/backend";
import type {ActionMap} from "app/store";
import {api, put} from "app/store/sagas/common";

export function* change({payload}: ActionMap["RESOURCE.GROUP.CHANGE"]) {
  const result: api.ResultOf<typeof resourceChangeGroup> = yield api.authSafe(
    resourceChangeGroup,
    payload,
  );

  if (result.type === "OK") {
    yield put({type: "RESOURCE.GROUP.CHANGE.OK"});
    yield put({type: "CLUSTER.STATUS.REFRESH"});
    return;
  }

  yield put({
    type: "RESOURCE.GROUP.CHANGE.FAIL",
    payload: {
      message: api.getNonOkMessage(result),
    },
  });
}
