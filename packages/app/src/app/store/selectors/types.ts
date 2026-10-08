import type {$CombinedState} from "redux";

import type {root} from "app/store/reducers";

// combineReducers puts key $CombinedState
// see https://github.com/reduxjs/redux/issues/3689 :(
type ExcludeMess<KEYS> = Exclude<KEYS, typeof $CombinedState>;

type ReduxRoot = ReturnType<ReturnType<typeof root>>;
export type Root = {[K in ExcludeMess<keyof ReduxRoot>]: ReduxRoot[K]};

export type ClusterData = NonNullable<Root["clusterData"]>;
export type TaskKeys = ExcludeMess<keyof Root["tasks"]>;
