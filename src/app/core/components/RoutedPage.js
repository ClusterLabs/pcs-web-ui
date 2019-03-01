import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router";

import DashboardPage from "app/scenes/dashboard/components/DashboardPage";
import ClusterOverview
  from "app/scenes/cluster-overview/components/ClusterOverviewPage";
import ClusterNodes
  from "app/scenes/cluster-node-list/components/ClusterNodesPage";
import ClusterResourceList
  from "app/scenes/cluster-resource-list/components/ClusterResourceListPage";
import ClusterStonithList
  from "app/scenes/cluster-stonith-list/components/ClusterStonithListPage";
import ClusterProperties
  from "app/scenes/cluster-properties/components/ClusterPropertiesPage";

import Scratch from "./Scratch";

const withClusterName = ClusterComponent => ({ match }) => (
  <ClusterComponent clusterName={match.params.clusterName} />
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
        path="/"
        render={() => <DashboardPage />}
      />
      <Route
        exact
        path="/cluster/:clusterName/nodes"
        render={withClusterName(ClusterNodes)}
      />
      <Route
        exact
        path="/cluster/:clusterName/resources"
        render={withClusterName(ClusterResourceList)}
      />
      <Route
        exact
        path="/cluster/:clusterName/stonith"
        render={withClusterName(ClusterStonithList)}
      />
      <Route
        exact
        path="/cluster/:clusterName/properties"
        render={withClusterName(ClusterProperties)}
      />
      <Route
        exact
        path="/cluster/:clusterName"
        render={withClusterName(ClusterOverview)}
      />
      <Route
        render={() => (<div>404</div>)}
      />
    </Switch>
  </ConnectedRouter>
);
export default RoutedPage;
