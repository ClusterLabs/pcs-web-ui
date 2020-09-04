import { Reducer as ReduxReducer, combineReducers } from "redux";

import { Action } from "./actions";

export type Reducer<S> = ReduxReducer<S, Action>;
export { combineReducers };
