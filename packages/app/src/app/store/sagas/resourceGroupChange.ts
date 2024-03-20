import {resourceChangeGroup} from "app/backend";
import {ActionMap} from "app/store";
import {api, put} from "app/store/sagas/common";

export function* change({key, payload}: ActionMap["RESOURCE.GROUP.CHANGE"]) {
  const result: api.ResultOf<typeof resourceChangeGroup> = yield api.authSafe(
    resourceChangeGroup,
    {
      clusterName: key.clusterName,
      ...payload,
    },
  );

  if (result.type === "OK") {
    yield put({
      type: "RESOURCE.GROUP.CHANGE.OK",
      key,
    });
    yield put({type: "CLUSTER.STATUS.REFRESH", key});
    return;
  }

  yield put({
    type: "RESOURCE.GROUP.CHANGE.FAIL",
    key,
    payload: {
      message: api.getNonOkMessage(result),
    },
  });
}
