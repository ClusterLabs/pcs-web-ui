import { $CombinedState, Reducer as ReduxReducer } from "redux";

import { Action } from "app/store/actions";

export type Reducer<S> = ReduxReducer<S, Action>;

// combineReducers puts key $CombinedState
// see https://github.com/reduxjs/redux/issues/3689 :(
/* eslint-disable @typescript-eslint/no-explicit-any */
export type ReturnTypeWithoutCombinedState<
  REDUCER extends (...args: any[]) => any,
> = {
  [K in Exclude<keyof ReturnType<REDUCER>, typeof $CombinedState>]: ReturnType<
    REDUCER
  >[K];
};
