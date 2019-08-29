import { Selector, RootState } from "app/core/types";

import { DashboardState, DashboardPageState } from "./types";

const localState: Selector<RootState, DashboardPageState> = (
  state => state.dashboard
);

export const getDashboard: Selector<RootState, DashboardState> = (
  state => localState(state).dashboardState
);

export const areDataLoaded: Selector<RootState, boolean> = (
  state => localState(state).dataFetchState === "SUCCESS"
);
