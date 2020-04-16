import { Task } from "redux-saga";
import {
  all,
  cancel,
  cancelled,
  delay,
  fork,
  put,
  take,
} from "redux-saga/effects";

import { Action, SetupDataReading, actionType } from "app/actions";

const SYNC_DELAY = 30 * 1000; // ms

export function* timer(action: Action) {
  try {
    yield delay(SYNC_DELAY);
    yield put(action);
  } finally {
    if (yield cancelled()) {
      // console.log(`Sync data cancelled`);
    }
  }
}

export function* dataLoadManage({
  START,
  STOP,
  REFRESH,
  SUCCESS,
  FAIL,
  refresh,
  fetch,
  getSyncId = null,
}: {
  START: Action["type"];
  STOP: Action["type"];
  REFRESH: Action["type"];
  SUCCESS: Action["type"];
  FAIL: Action["type"];
  refresh: (id?: string) => Action;
  // It seems it selects definition of 'fork' with saga on 2nd place (index 1)
  fetch: Parameters<typeof fork>[1];
  getSyncId?: ((action: Action) => string) | null;
}) {
  /* eslint-disable no-constant-condition, no-console */
  const syncMap: Record<
    string,
    {
      fetchASAP: boolean;
      fetch: Task | null;
      timer: Task | null;
    }
  > = {};

  while (true) {
    const action = yield take([START, STOP, REFRESH, SUCCESS, FAIL]);
    const id = getSyncId ? getSyncId(action) : "";
    if (action.type === START) {
      if (id in syncMap) {
        console.warn("Sync requested when already started! Action ignored.");
        continue;
      }
      syncMap[id] = {
        fetchASAP: false,
        fetch: yield fork(fetch, id),
        timer: null,
      };
      continue;
    }

    if (!(id in syncMap)) {
      console.warn(`Sync not started! Action '${action.type}' ignored.`);
      continue;
    }

    if ([SUCCESS, FAIL].includes(action.type)) {
      if (syncMap[id].fetchASAP) {
        syncMap[id].fetchASAP = false;
        syncMap[id].fetch = yield fork(fetch, id);
      } else {
        syncMap[id].fetch = null;
        syncMap[id].timer = yield fork(timer, refresh(id));
      }
    }

    if (action.type === REFRESH) {
      if (syncMap[id].timer) {
        yield cancel(syncMap[id].timer as Task);
      }
      if (syncMap[id].fetch) {
        syncMap[id].fetchASAP = true;
      } else {
        syncMap[id].fetch = yield fork(fetch, id);
      }
    }

    if (action.type === STOP) {
      yield all(
        [syncMap[id].fetch, syncMap[id].timer]
          .filter(t => t)
          .map(t => cancel(t as Task)),
      );
      delete syncMap[id];
    }
  }
}

export function* setUpDataReading() {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  let stops: Record<string, { specificator?: any; stop: Action }> = {};
  const stop = (name: string) => put(stops[name].stop);
  const stopSpecificator = (name: string) => stops[name].specificator;

  /* eslint-disable no-constant-condition */
  while (true) {
    const { payload: readings }: SetupDataReading = yield take(
      actionType("DATA_READING.SET_UP"),
    );
    const newNames = Object.keys(readings);
    const oldNames = Object.keys(stops);

    const stopActions = oldNames
      .filter(
        name =>
          !newNames.includes(name)
          || readings[name].specificator !== stopSpecificator(name),
      )
      .map(stop);

    const startActions = newNames
      .filter(
        name =>
          !oldNames.includes(name)
          || readings[name].specificator !== stopSpecificator(name),
      )
      .map(name => put(readings[name].start));

    stops = newNames.reduce(
      (nextStops, name) => ({
        ...nextStops,
        [name]: {
          stop: readings[name].stop,
          specificator: readings[name].specificator,
        },
      }),
      {},
    );

    yield all([...stopActions, ...startActions]);
  }
}

export default [fork(setUpDataReading)];
