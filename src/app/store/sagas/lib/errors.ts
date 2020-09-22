import { InvalidResult, log } from "app/backend";

import { putNotification } from "../notifications";

export function* invalidResult(result: InvalidResult, taskLabel: string) {
  const errorDescription = `Communication error while: ${taskLabel}`;
  log.invalidResponse(result, errorDescription);
  yield putNotification(
    "ERROR",
    `${errorDescription}. Details in the browser console`,
  );
}

export function* networkError(error: Error, taskLabel: string) {
  const errorDescription = `Communication error while: ${taskLabel}`;
  log.error(error, errorDescription);
  yield putNotification(
    "ERROR",
    `${errorDescription}. Details in the browser console`,
  );
}
