import { Reducer } from "redux";
import { ForkEffect } from "redux-saga/effects";

import { RootState } from "./rootState";

export type RootStateKeys = keyof RootState;

export interface Selector<State = any, Selected = any> {
  (state: State): Selected,
}
export type RootSelector = <Selected>(state: RootState) => Selected;

export type Plugin = (name: string) => {
  reducer: Reducer,
  sagas: ForkEffect[],
}

export interface RegisteredPlugins {
  reducers: Partial<Record<RootStateKeys, Reducer>>,
  sagas: ForkEffect[],
}
