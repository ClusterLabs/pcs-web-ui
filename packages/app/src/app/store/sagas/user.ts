import {put} from "./common";

const {user} = pcsUiEnvAdapter;

export function* init() {
  const currentUser: Awaited<ReturnType<typeof user>> = yield user();
  yield put({
    type: "USER.LOADED",
    payload: {isHaclient: currentUser.isHaclient},
  });
}
