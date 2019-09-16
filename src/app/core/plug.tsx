import React from "react";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { all } from "redux-saga/effects";

import * as username from "app/services/username";
import * as login from "app/scenes/login";
import * as dashboard from "app/scenes/dashboard";
import * as cluster from "app/services/cluster";
import * as addExistingCluster from "app/scenes/dashboard-add-cluster";
import * as notifications from "app/scenes/notifications";
import * as dataLoad from "app/services/data-load";
import { ClusterDetailPage } from "app/scenes/cluster-detail";
import { ClusterNodesPage } from "app/scenes/cluster-node-list";
import { ClusterResourceListPage } from "app/scenes/cluster-resource-list";
import { ClusterResourceDetailPage } from "app/scenes/cluster-resource-detail";
import { ClusterFenceDevicesPage } from "app/scenes/cluster-fence-devices";

import { RootState } from "./types";
import Scratch from "./components/Scratch";
import { withUrlArgs } from "./components/withClusterUrlName";

const rootReducer = (history: History) => combineReducers<RootState>({
  username: username.reducer,
  router: connectRouter(history),
  dashboard: dashboard.reducer,
  addExistingCluster: addExistingCluster.reducer,
  cluster: cluster.reducer,
  login: login.reducer,
  notifications: notifications.reducer,
});

function* rootSaga() {
  yield all([
    ...username.sagas,
    ...login.sagas,
    ...dataLoad.sagas,
    ...dashboard.sagas,
    ...cluster.sagas,
    ...addExistingCluster.sagas,
    ...notifications.sagas,
  ]);
}

const routes = [
  {
    exact: true,
    path: "/",
    render: () => <dashboard.DashboardPage />,
  },
  {
    exact: true,
    path: "/scratch",
    render: () => <Scratch />,
  },
  {
    exact: true,
    path: "/add-cluster",
    render: () => <addExistingCluster.AddClusterPage />,
  },
  {
    exact: true,
    path: "/cluster/:clusterUrlName/nodes",
    render: withUrlArgs(["clusterUrlName"], ClusterNodesPage),
  },
  {
    exact: true,
    path: "/cluster/:clusterUrlName/resources",
    render: withUrlArgs(["clusterUrlName"], ClusterResourceListPage),
  },
  {
    exact: true,
    path: "/cluster/:clusterUrlName/resources/:resourceUrlName",
    render: withUrlArgs(
      ["clusterUrlName", "resourceUrlName"],
      ClusterResourceDetailPage,
    ),
  },
  {
    exact: true,
    path: "/cluster/:clusterUrlName/fence-devices",
    render: withUrlArgs(["clusterUrlName"], ClusterFenceDevicesPage),
  },
  {
    exact: true,
    path: "/cluster/:clusterUrlName",
    render: withUrlArgs(["clusterUrlName"], ClusterDetailPage),
  },
  { render: () => <div>404</div> },
];

export {
  rootReducer,
  rootSaga,
  routes,
};
