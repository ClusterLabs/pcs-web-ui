import type {Task} from "redux-saga";

import type {Action} from "app/store/actions";

import {all, cancel, delay, fork, put, take} from "./effects";

const SYNC_DELAY = 30 * 1000; // ms

export function* timer(action: Action) {
  try {
    yield delay(SYNC_DELAY);
    yield put(action);
  } finally {
    // if (yield cancelled()) {
    //   // console.log(`Sync data cancelled`);
    // }
  }
}

export function* manage({
  START,
  STOP,
  REFRESH,
  SUCCESS,
  FAIL,
  refresh,
  fetch,
}: {
  START: Action["type"];
  STOP: Action["type"];
  REFRESH: Action["type"];
  SUCCESS: Action["type"];
  FAIL: Action["type"];
  refresh: () => Action;
  // It seems it selects definition of 'fork' with saga on 2nd place (index 1)
  fetch: Parameters<typeof fork>[1];
}) {
  // Single-cluster model: this manages exactly one sync, so the per-cluster
  // syncMap keyed by getSyncId is gone in favor of plain local state.
  let started = false;
  let fetchASAP = false;
  let fetchTask: Task | null = null;
  let timerTask: Task | null = null;

  while (true) {
    const action: Action = yield take([START, STOP, REFRESH, SUCCESS, FAIL]);

    if (action.type === START) {
      if (started) {
        console.warn("Sync requested when already started! Action ignored.");
        continue;
      }
      started = true;
      fetchTask = yield fork(fetch);
      continue;
    }

    if (!started) {
      console.warn(`Sync not started! Action '${action.type}' ignored.`);
      continue;
    }

    if ([SUCCESS, FAIL].includes(action.type)) {
      if (fetchASAP) {
        fetchASAP = false;
        fetchTask = yield fork(fetch);
      } else {
        fetchTask = null;
        timerTask = yield fork(timer, refresh());
      }
    }

    if (action.type === REFRESH) {
      if (timerTask) {
        yield cancel(timerTask);
      }
      if (fetchTask) {
        fetchASAP = true;
      } else {
        fetchTask = yield fork(fetch);
      }
    }

    if (action.type === STOP) {
      yield all(
        [fetchTask, timerTask].filter(t => t).map(t => cancel(t as Task)),
      );
      started = false;
      fetchASAP = false;
      fetchTask = null;
      timerTask = null;
    }
  }
}
