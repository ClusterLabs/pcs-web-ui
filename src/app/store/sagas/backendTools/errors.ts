import { api } from "app/backend";

import { putNotification } from "../notifications";
/* eslint-disable no-console */

export function* error(
  result: api.result.HttpFail | api.result.NotJson | api.result.InvalidPayload,
  taskLabel: string,
) {
  const detailsInConsole = "Details in the browser console.";
  switch (result.type) {
    case "UNAUTHORIZED":
      yield putNotification(
        "ERROR",
        `Unauthorized while: ${taskLabel}. ${detailsInConsole}`,
      );
      break;
    default:
      yield putNotification(
        "ERROR",
        `Communication error while: ${taskLabel}.  ${detailsInConsole}`,
      );
  }
}

export function* callError(
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
