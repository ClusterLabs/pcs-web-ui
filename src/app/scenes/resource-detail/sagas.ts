import {
  put,
  takeEvery,
} from "redux-saga/effects";
import { push } from "connected-react-router";

import { putNotification } from "app/scenes/notifications";
import { typeIs } from "app/common/utils";

import { CorrectWrongResourceTypeView } from "./actions";

function* correctView(
  { payload: { resourceId, viewName, url } }: CorrectWrongResourceTypeView,
) {
  yield putNotification(
    "INFO",
    `No view "${viewName}" for resource "${resourceId}". Redirecting to ${url}`,
  );
  yield put(push(url));
}

export default [
  takeEvery(
    typeIs<CorrectWrongResourceTypeView["type"]>(
      "RESOURCE_TREE_ITEM_TYPE.CORRECT_VIEW",
    ),
    correctView,
  ),
];
