import { Reducer } from "redux";
import { ForkEffect } from "redux-saga/effects";
import { RouterState } from "connected-react-router";

import { ClusterServiceState } from "app/services/cluster/types";
import { DashboardPageState } from "app/scenes/dashboard/types";
import { LoginState } from "app/scenes/login/types";
import { NotificationState } from "app/scenes/notifications/types";
import {
  DashboardAddClusterPageState,
} from "app/scenes/dashboard-add-cluster/types";

export enum RootStateKey {
  Router = "router",
  Dashboard = "dashboard",
  AddExistingCluster = "addExistingCluster",
  Cluster = "cluster",
  Login = "login",
  Notifications = "notifications",
}

export interface RootState {
  [RootStateKey.Router]: RouterState,
  [RootStateKey.Dashboard]: DashboardPageState,
  [RootStateKey.AddExistingCluster]: DashboardAddClusterPageState,
  [RootStateKey.Cluster]: ClusterServiceState,
  [RootStateKey.Login]: LoginState,
  [RootStateKey.Notifications]: NotificationState,
}

export type RootStateKeys = keyof RootState;

export interface Selector<State = any, Selected = any> {
  (state: State): Selected,
}
export type RootSelector = <Selected>(state: RootState) => Selected;

export type Plugin = (name: string) => {
  reducer: Reducer,
  sagas: ForkEffect[],
}

export interface RegisteredPlugins {
  reducers: Partial<Record<RootStateKeys, Reducer>>,
  sagas: ForkEffect[],
}
