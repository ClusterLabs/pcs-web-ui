import { History } from "history";
import { RouterState } from "connected-react-router";

import { Selector, RootState } from "app/core/types";

const localState: Selector<RootState, RouterState> = state => state.router;

export const getPathName: Selector<RootState, History.Pathname> = (
  state => localState(state).location.pathname
);
