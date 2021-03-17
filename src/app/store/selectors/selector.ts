import { types } from "app/store/reducers";

export interface Selector<Selected, State = types.RootState> {
  (state: State): Selected;
}
