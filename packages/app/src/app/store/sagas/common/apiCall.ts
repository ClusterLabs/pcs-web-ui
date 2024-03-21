import {SagaIterator} from "redux-saga";

import {api} from "app/backend";
import {ActionPayload} from "app/store/actions";

import {call, put, take} from "./effects";
import * as log from "./log";
import {messages, putNotification} from "./notifications";
/* eslint-disable no-console */

type Notification = ActionPayload["NOTIFICATION.CREATE"];

type ResultNotOk =
  | api.result.HttpFail
  | api.result.NotJson
  | api.result.InvalidPayload;

export const errorMessage = (result: ResultNotOk, taskLabel: string) => {
  const detailsInConsole = "Details in the browser console.";
  switch (result.type) {
    case "UNAUTHORIZED":
      return `Unauthorized while: ${taskLabel}. ${detailsInConsole}`;

    case "BAD_HTTP_STATUS":
      return messages.taskFailed(taskLabel, result.text);

    default:
      return `Communication error while: ${taskLabel}. ${detailsInConsole}`;
  }
};

function* error(
  result: ResultNotOk,
  taskLabel: string,
  description: Notification["description"] = undefined,
) {
  const detailsInConsole = "Details in the browser console.";
  const message = errorMessage(result, taskLabel);
  switch (result.type) {
    case "BAD_HTTP_STATUS":
      yield putNotification(
        "ERROR",
        `Task: ${taskLabel} failed`,
        {
          type: "LINES",
          lines: [result.text, detailsInConsole],
        },
        description,
      );
      break;

    default:
      yield putNotification("ERROR", message, undefined, description);
  }
}

export function* processError(
  result: api.result.HttpFail | api.result.NotJson | api.result.InvalidPayload,
  taskLabel: string,
  options: {
    action?: (() => void) | undefined;
    useNotification?: boolean;
  } = {
    useNotification: true,
    action: undefined,
  },
  description: Notification["description"] = undefined,
) {
  log.error(result, taskLabel);
  if (options.action) {
    yield options.action();
  }
  if (options.useNotification) {
    yield error(result, taskLabel, description);
  }
}

export function* authSafe<
  PAYLOAD,
  RESULT extends api.result.Overall<PAYLOAD>,
  PARAMS extends unknown[],
>(
  fn: (..._fnArgs: PARAMS) => Promise<RESULT>,
  ...args: PARAMS
): SagaIterator<RESULT> {
  // explicit typing of the yielded value is unfortunately necessary
  // https://github.com/microsoft/TypeScript/issues/32523
  // https://github.com/microsoft/TypeScript/issues/26959
  let response: RESULT = yield call<typeof fn>(fn, ...args);
  if (response.type === "UNAUTHORIZED") {
    // Ok, we got 401. So, ask for credentials and wait for login success...
    yield put({type: "AUTH.REQUIRED"});
    yield take("AUTH.SUCCESS");
    // ...and then second attempt.
    response = yield call(fn, ...args);
    if (response.type === "UNAUTHORIZED") {
      log.stillUnauthorized();
    }
  }
  return response;
}

export const getNonOkMessage = (result: ResultNotOk) => {
  if (result.type === "UNAUTHORIZED") {
    return "Unauthorized";
  }
  if (result.type === "BACKEND_NOT_FOUND") {
    return "Backend not found";
  }
  if (result.type === "NON_HTTP_PROBLEM") {
    return `Non http problem: ${result.problem}`;
  }
  if (result.type === "INVALID_PAYLOAD") {
    return `Invalid response payload: ${result.errors.join("\n")}`;
  }
  return result.text;
};
