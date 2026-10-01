import {eventChannel} from "redux-saga";

import {CLUSTER_KEY} from "app/store/clusterStorageKey";

import {put} from "./common";

const {user} = pcsUiEnvAdapter;

export function* changed() {
  const isSuperuser = user.isSuperuser();
  yield put({
    type: "USER.SUPERUSER_CHANGED",
    payload: {isSuperuser},
  });

  const isHaclient: Awaited<ReturnType<typeof user.isHaclient>> =
    yield user.isHaclient();

  if (!isSuperuser && !isHaclient) {
    yield put({
      type: "CLUSTER.STATUS.SYNC.STOP",
      key: {clusterName: CLUSTER_KEY},
    });
    yield put({
      type: "USER.PERMISSIONS_LOST",
    });
  }
}

export const changeChannel = eventChannel<null>(emit => {
  const changeHandler = () => emit(null);
  user.addChangeListener(changeHandler);
  return () => {
    // nothing for now
  };
});

//

export function* init() {
  yield put({
    type: "USER.LOADED",
    payload: {
      isHaclient: yield user.isHaclient(),
      isSuperuser: user.isSuperuser(),
    },
  });
}
