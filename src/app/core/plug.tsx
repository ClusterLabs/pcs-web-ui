import React from "react";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { all } from "redux-saga/effects";

import * as url from "app/common/urls";
import * as username from "app/services/username";
import * as login from "app/scenes/login";
import * as dashboard from "app/scenes/dashboard";
import * as resourceTree from "app/scenes/resource-tree";
import * as cluster from "app/services/cluster";
import * as addExistingCluster from "app/scenes/dashboard-add-cluster";
import * as notifications from "app/scenes/notifications";
import * as dataLoad from "app/services/data-load";
import { ClusterDetailPage } from "app/scenes/cluster-detail";
import { NodeListPage } from "app/scenes/node-list";
import { ResourceDetailPage } from "app/scenes/resource-detail";
import { ResourceAttributesPage } from "app/scenes/resource-attributes";
import { FenceDeviceListPage } from "app/scenes/fence-device-list";

import { RootState } from "./types";
import Scratch from "./components/Scratch";
import { withUrlArgs } from "./components/withClusterUrlName";

const rootReducer = (history: History) => combineReducers<RootState>({
  username: username.reducer,
  router: connectRouter(history),
  dashboard: dashboard.reducer,
  addExistingCluster: addExistingCluster.reducer,
  cluster: cluster.reducer,
  resourceTree: resourceTree.reducer,
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
    path: url.clusterNodes(":clusterUrlName"),
    render: withUrlArgs(["clusterUrlName"], NodeListPage),
  },
  {
    exact: true,
    path: url.clusterResources(":clusterUrlName"),
    render: withUrlArgs(["clusterUrlName"], resourceTree.ResourceTreePage),
  },
  {
    exact: true,
    path: url.resourcesDetail(":clusterUrlName", ":resourceUrlName"),
    render: withUrlArgs(
      ["clusterUrlName", "resourceUrlName"],
      ResourceDetailPage,
    ),
  },
  {
    exact: true,
    path: url.resourcesAttributes(":clusterUrlName", ":resourceUrlName"),
    render: withUrlArgs(
      ["clusterUrlName", "resourceUrlName"],
      ResourceAttributesPage,
    ),
  },
  {
    exact: true,
    path: url.clusterFenceDevices(":clusterUrlName"),
    render: withUrlArgs(["clusterUrlName"], FenceDeviceListPage),
  },
  {
    exact: true,
    path: url.clusterDetail(":clusterUrlName"),
    render: withUrlArgs(["clusterUrlName"], ClusterDetailPage),
  },
  { render: () => <div>404</div> },
];

export {
  rootReducer,
  rootSaga,
  routes,
};
