import {
  put,
  takeEvery,
} from "redux-saga/effects";
import { push } from "connected-react-router";

import { actionType, ResourceDetailActions } from "app/actions";

import { putNotification } from "./notifications";

function* correctView({
  payload: { resourceId, viewName, url },
}: ResourceDetailActions["CorrectWrongResourceTypeView"]) {
  yield putNotification(
    "INFO",
    `No view "${viewName}" for resource "${resourceId}". Redirecting to ${url}`,
  );
  yield put(push(url));
}

export default [
  takeEvery(actionType("RESOURCE_TREE_ITEM_TYPE.CORRECT_VIEW"), correctView),
];
