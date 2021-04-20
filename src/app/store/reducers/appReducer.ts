import { Reducer } from "redux";

import { Action } from "app/store/actions";

export type AppReducer<S> = Reducer<S, Action>;
