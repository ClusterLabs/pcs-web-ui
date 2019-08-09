import { History } from "history";
import { RouterState } from "connected-react-router";

import { Selector, RootState, RootStateKey } from "app/core/types";

const localState: Selector<RootState, RouterState> = (
  state => state[RootStateKey.Router]
);

export const getPathName: Selector<RootState, History.Pathname> = (
  state => localState(state).location.pathname
);
