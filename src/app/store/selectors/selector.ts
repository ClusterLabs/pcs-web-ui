import { types } from "app/store/state";

export interface Selector<Selected, State = types.RootState> {
  (state: State): Selected;
}
