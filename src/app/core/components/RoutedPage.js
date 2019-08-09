import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router";

import { DashboardPage } from "app/scenes/dashboard";
import { ClusterOverviewPage } from "app/scenes/cluster-overview";
import { ClusterNodesPage } from "app/scenes/cluster-node-list";
import { ClusterResourceListPage } from "app/scenes/cluster-resource-list";
import { ClusterStonithListPage } from "app/scenes/cluster-stonith-list";
import { AddClusterPage } from "app/scenes/dashboard-add-cluster";

import Scratch from "./Scratch";

const withClusterName = ClusterComponent => ({ match }) => (
  <ClusterComponent clusterUrlName={match.params.clusterUrlName} />
);

const RoutedPage = ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route
        exact
        path="/scratch"
        render={() => <Scratch />}
      />
      <Route
        exact
        path="/add-cluster"
        render={() => <AddClusterPage />}
      />
      <Route
        exact
        path="/"
        render={() => <DashboardPage />}
      />
      <Route
        exact
        path="/cluster/:clusterUrlName/nodes"
        render={withClusterName(ClusterNodesPage)}
      />
      <Route
        exact
        path="/cluster/:clusterUrlName/resources"
        render={withClusterName(ClusterResourceListPage)}
      />
      <Route
        exact
        path="/cluster/:clusterUrlName/stonith"
        render={withClusterName(ClusterStonithListPage)}
      />
      <Route
        exact
        path="/cluster/:clusterUrlName"
        render={withClusterName(ClusterOverviewPage)}
      />
      <Route
        render={() => (<div>404</div>)}
      />
    </Switch>
  </ConnectedRouter>
);
export default RoutedPage;
