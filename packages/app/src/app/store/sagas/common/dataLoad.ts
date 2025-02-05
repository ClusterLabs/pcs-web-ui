import type {Task} from "redux-saga";

import type {Action, ActionMap, ActionPayload} from "app/store/actions";

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
  getSyncId = null,
}: {
  START: Action["type"];
  STOP: Action["type"];
  REFRESH: Action["type"];
  SUCCESS: Action["type"];
  FAIL: Action["type"];
  refresh: (_id?: string) => Action;
  // It seems it selects definition of 'fork' with saga on 2nd place (index 1)
  fetch: Parameters<typeof fork>[1];
  getSyncId?: ((_action: Action) => string) | null;
}) {
  const syncMap: Record<
    string,
    {
      fetchASAP: boolean;
      fetch: Task | null;
      timer: Task | null;
    }
  > = {};

  while (true) {
    const action: Action = yield take([START, STOP, REFRESH, SUCCESS, FAIL]);
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
  let currents: ActionPayload["DATA_READING.SET_UP"]["readings"] = [];

  while (true) {
    const {
      payload: {behavior, readings},
    }: ActionMap["DATA_READING.SET_UP"] = yield take("DATA_READING.SET_UP");

    const currentIds = currents.map(s => s.id);
    const newIds = readings.map(r => r.id);

    const news = readings.filter(r => !currentIds.includes(r.id));

    if (behavior === "replace") {
      const olds = currents.filter(s => !newIds.includes(s.id));
      currents = readings;
      yield all([
        ...olds.map(r => put(r.stop)),
        ...news.map(r => put(r.start)),
      ]);
    } else {
      currents = [...currents, ...news];
      yield all([...news.map(r => put(r.start))]);
    }
  }
}
