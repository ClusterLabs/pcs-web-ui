import { Task } from "redux-saga";

import { Action, ActionLeaf, ActionMap } from "app/store/actions";

import { all, cancel, cancelled, delay, fork, put, take } from "./effects";

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

export function* manage({
  START,
  STOP,
  REFRESH,
  SUCCESS,
  refresh,
  fetch,
  getSyncId = null,
}: {
  START: Action["type"];
  STOP: Action["type"];
  REFRESH: Action["type"];
  SUCCESS: Action["type"];
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
    const action = yield take([START, STOP, REFRESH, SUCCESS]);
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

    if ([SUCCESS].includes(action.type)) {
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

type Stop = { stop: ActionLeaf; specificator: string };

export const takeNewLoadings = (
  readings: ActionMap["DATA_READING.SET_UP"]["payload"],
  stops: Stop[],
) => {
  const newNames = readings.map(r => r.specificator);
  const oldNames = stops.map(s => s.specificator);

  return {
    startActions: readings
      .filter(r => !oldNames.includes(r.specificator))
      .map(r => r.start),
    stopActions: stops
      .filter(s => !newNames.includes(s.specificator))
      .map(s => s.stop),
    nextStops: readings.map(r => ({
      stop: r.stop,
      specificator: r.specificator,
    })),
  };
};

export function* setUpDataReading() {
  let stops: Stop[] = [];

  /* eslint-disable no-constant-condition */
  while (true) {
    const { payload }: ActionMap["DATA_READING.SET_UP"] = yield take(
      "DATA_READING.SET_UP",
    );
    const { startActions, stopActions, nextStops } = takeNewLoadings(
      payload,
      stops,
    );

    stops = nextStops;

    yield all([
      ...stopActions.map(a => put(a)),
      ...startActions.map(a => put(a)),
    ]);
  }
}
