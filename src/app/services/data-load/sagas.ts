import { Task } from "redux-saga";
import {
  all,
  delay,
  cancel,
  cancelled,
  fork,
  put,
  take,
  ForkEffect,
} from "redux-saga/effects";

import { Action, actionType } from "app/common/actions";

import { ReadingDefinition } from "./types";

const SYNC_DELAY = 30 * 1000;// ms

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

export interface DataLoadProps {
  START: Action["type"],
  STOP: Action["type"],
  SUCCESS: Action["type"],
  FAIL: Action["type"],
  refreshAction: Action,
  takeStartPayload: (payload: any) => void,
  fetch: () => ForkEffect,
}

interface LoadTasks {
  fetch: Task | undefined,
  timer: Task | undefined,
}

export function* dataLoadManage({
  START,
  STOP,
  SUCCESS,
  FAIL,
  refreshAction,
  takeStartPayload,
  fetch,
}: DataLoadProps) { /* eslint-disable no-constant-condition, no-console */
  let syncStarted = false;
  let fetchFast = false;
  const tasks: LoadTasks = { fetch: undefined, timer: undefined };

  const { type: REFRESH } = refreshAction;

  while (true) {
    const { type, payload } = yield take([START, STOP, REFRESH, SUCCESS, FAIL]);
    if (type === START && syncStarted) {
      console.warn("Sync requested when already started! Action ignored.");
      continue;
    }
    if (type !== START && !syncStarted) {
      console.warn(`Sync not started but '${type}' detected! Action ignored.`);
      continue;
    }
    switch (type) {
      case START:
        syncStarted = true;
        takeStartPayload(payload);
        tasks.fetch = yield fetch();
        break;

      case SUCCESS: case FAIL:
        if (fetchFast) {
          fetchFast = false;
          tasks.fetch = yield fetch();
        } else {
          tasks.fetch = undefined;
          tasks.timer = yield fork(timer, refreshAction);
        }
        break;

      case REFRESH:
        if (tasks.timer) {
          yield cancel(tasks.timer);
        }
        if (tasks.fetch) {
          fetchFast = true;
        } else {
          tasks.fetch = yield fetch();
        }
        break;

      case STOP:
        syncStarted = false;
        yield all(Object.values(tasks).filter(t => t).map(t => cancel(t)));
        break;
      // no default
    }
  }
}

type StopReadingMap = Record<string, {
  specificator?: any,
  stop: Action,
}>

export function* setUpDataReading() {
  let stops: StopReadingMap = {};
  const stop = (name: string) => put(stops[name].stop);
  const stopSpecificator = (name: string) => stops[name].specificator;
  const start = (
    readings: Record<string, ReadingDefinition>,
    name: string,
  ) => put(readings[name].start);

  /* eslint-disable no-constant-condition */
  while (true) {
    const { payload: readings } = yield take(actionType("DATA_READING.SET_UP"));
    const newNames = Object.keys(readings);
    const oldNames = Object.keys(stops);

    const stopActions = oldNames
      .filter(name => (
        !newNames.includes(name)
        ||
        readings[name].specificator !== stopSpecificator(name)
      ))
      .map(name => stop(name))
    ;

    const startActions = newNames
      .filter(name => (
        !oldNames.includes(name)
        ||
        readings[name].specificator !== stopSpecificator(name)
      ))
      .map(name => start(readings, name))
    ;

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

export default [
  fork(setUpDataReading),
];
