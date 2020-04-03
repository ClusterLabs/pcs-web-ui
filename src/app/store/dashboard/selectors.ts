import { Selector } from "../types";

import { DashboardState } from "./types";

export const getDashboard: Selector<DashboardState> = state =>
  state.dashboard.dashboardState;

export const areDataLoaded: Selector<boolean> = state =>
  state.dashboard.dataFetchState === "SUCCESS";
