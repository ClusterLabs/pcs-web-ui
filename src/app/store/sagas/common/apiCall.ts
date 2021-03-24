import { SagaIterator } from "redux-saga";

import { api } from "app/backend";

import { call, put, take } from "./effects";
import { putNotification } from "./notifications";
/* eslint-disable no-console */

export const errorMessage = (
  result: api.result.HttpFail | api.result.NotJson | api.result.InvalidPayload,
  taskLabel: string,
) => {
  const detailsInConsole = "Details in the browser console.";
  switch (result.type) {
    case "UNAUTHORIZED":
      return `Unauthorized while: ${taskLabel}. ${detailsInConsole}`;
    case "BAD_HTTP_STATUS":
      return `Task: ${taskLabel} failed: ${result.text}. ${detailsInConsole}`;
    default:
      return `Communication error while: ${taskLabel}. ${detailsInConsole}`;
  }
};

function* error(
  result: api.result.HttpFail | api.result.NotJson | api.result.InvalidPayload,
  taskLabel: string,
) {
  const detailsInConsole = "Details in the browser console.";
  const message = errorMessage(result, taskLabel);
  switch (result.type) {
    case "BAD_HTTP_STATUS":
      yield putNotification("ERROR", `Task: ${taskLabel} failed`, {
        type: "LINES",
        lines: [result.text, detailsInConsole],
      });
      break;
    default:
      yield putNotification("ERROR", message);
  }
}

export function* processError(
  result: api.result.HttpFail | api.result.NotJson | api.result.InvalidPayload,
  taskLabel: string,
  options: {
    action: (() => void) | undefined;
    useNotification?: boolean;
  } = {
    useNotification: true,
    action: undefined,
  },
) {
  api.log.error(result, taskLabel);
  if (options.action) {
    yield options.action();
  }
  if (options.useNotification) {
    yield error(result, taskLabel);
  }
}

export function* authSafe<
  PAYLOAD,
  RESULT extends api.result.Overall<PAYLOAD>,
  PARAMS extends unknown[],
>(
  fn: (...fnArgs: PARAMS) => Promise<RESULT>,
  ...args: PARAMS
): SagaIterator<RESULT> {
  // explicit typing of the yielded value is unfortunatelly neccessary
  // https://github.com/microsoft/TypeScript/issues/32523
  // https://github.com/microsoft/TypeScript/issues/26959
  let response: RESULT = yield call<typeof fn>(fn, ...args);
  if (response.type === "UNAUTHORIZED") {
    // Ok, we got 401. So, ask for credentials and wait for login success...
    yield put({ type: "AUTH.REQUIRED" });
    yield take("AUTH.SUCCESS");
    // ...and then second attempt.
    response = yield call(fn, ...args);
    if (response.type === "UNAUTHORIZED") {
      api.log.stillUnauthorized();
    }
  }
  return response;
}
