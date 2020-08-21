import {
  ActionPattern,
  ForkEffect,
  PutEffect,
  TakeEffect,
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
} from "redux-saga/effects";
import { Action } from "app/store/actions";

export const put = (action: Action): PutEffect<Action> =>
  sagaPut<Action>(action);

/* eslint-disable @typescript-eslint/no-explicit-any */
export function takeEvery<A extends Action>(
  typeOfAction: A["type"],
  worker: (action: A) => any,
): ForkEffect<never> {
  return sagaTakeEvery(typeOfAction, worker);
}

export function take(pattern?: Action["type"] | ActionPattern): TakeEffect {
  return sagaTake(pattern);
}

export { all, call, fork, race, cancel, cancelled, delay, sagaPut };
