import {eventChannel} from "redux-saga";

import {put} from "./common";

const {user} = pcsUiEnvAdapter;

export function* changed() {
  yield put({
    type: "USER.SUPERUSER_CHANGED",
    payload: {
      isSuperuser: user.isSuperuser(),
    },
  });
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
