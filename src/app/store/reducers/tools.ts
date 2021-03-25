import { Reducer as ReduxReducer } from "redux";

import { Action } from "app/store/actions";

export type Reducer<S> = ReduxReducer<S, Action>;
