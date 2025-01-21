import type {Reducer} from "redux";

import type {Action} from "app/store/actions";

export type AppReducer<S> = Reducer<S, Action>;
