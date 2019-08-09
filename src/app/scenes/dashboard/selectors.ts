import { Selector, RootState, RootStateKey } from "app/core/types";

import {
  DashboardState,
  DashboardPageState,
  FETCH_STATUS,
} from "./types";


const localState: Selector<RootState, DashboardPageState> = (
  state => state[RootStateKey.Dashboard]
);

export const getDashboard: Selector<RootState, DashboardState> = (
  state => localState(state).dashboardState
);

export const areDataLoaded: Selector<RootState, boolean> = (
  state => localState(state).dataFetchState === FETCH_STATUS.SUCCESS
);
