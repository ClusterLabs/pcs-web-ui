import {
  type ForkEffect,
  type PutEffect,
  type TakeEffect,
  all,
  call,
  cancel,
  cancelled,
  delay,
  fork,
  race,
  put as sagaPut,
  take as sagaTake,
  takeEvery as sagaTakeEvery,
  select,
} from "redux-saga/effects";

import type {Action} from "app/store/actions";

export const put = (action: Action): PutEffect<Action> =>
  sagaPut<Action>(action);

export function takeEvery<A extends Action>(
  typeOfAction: A["type"],
  // biome-ignore lint/suspicious/noExplicitAny:
  worker: (_action: A) => any,
): ForkEffect<never> {
  return sagaTakeEvery(typeOfAction, worker);
}

export function take(pattern?: Action["type"] | Action["type"][]): TakeEffect {
  return sagaTake(pattern);
}

export {all, call, cancel, cancelled, delay, fork, race, sagaPut, select};
