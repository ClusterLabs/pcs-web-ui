import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router";

import DashboardPage from "app/scenes/dashboard/containers/Page";
import clusterConnect from "app/services/cluster/common_connector";
import ClusterPage from "app/scenes/cluster-overview/components/Page";
import ClusterNodesPage from "app/scenes/cluster-node-list/components/Page";
import ClusterNodeAddPage from "app/scenes/cluster-node-add/containers/Page";
import ClusterResourceListPage
  from "app/scenes/cluster-resource-list/components/Page";
import ClusterStonithListPage
  from "app/scenes/cluster-stonith-list/components/Page";
import ClusterPropertiesPage
  from "app/scenes/cluster-properties/containers/Page";
import ClusterAclPage from "app/scenes/cluster-acl/components/Page";

const RoutedPage = ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={DashboardPage} />
      <Route
        exact
        path="/cluster/:name/nodes"
        component={clusterConnect(ClusterNodesPage)}
      />
      <Route
        exact
        path="/cluster/:name/node-add"
        component={clusterConnect(ClusterNodeAddPage)}
      />
      <Route
        exact
        path="/cluster/:name/resources"
        component={clusterConnect(ClusterResourceListPage)}
      />
      <Route
        exact
        path="/cluster/:name/stonith"
        component={clusterConnect(ClusterStonithListPage)}
      />
      <Route
        exact
        path="/cluster/:name/properties"
        component={ClusterPropertiesPage}
      />
      <Route
        exact
        path="/cluster/:name/acl"
        component={clusterConnect(ClusterAclPage)}
      />
      <Route
        exact
        path="/cluster/:name"
        component={clusterConnect(ClusterPage)}
      />
      <Route
        render={() => <div>404</div>}
      />
    </Switch>
  </ConnectedRouter>
);
export default RoutedPage;
