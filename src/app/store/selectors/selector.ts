import * as types from "app/store/types";

export interface Selector<Selected, State = types.RootState> {
  (state: State): Selected;
}
