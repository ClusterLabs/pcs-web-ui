import React, {Component} from 'react';
import {ConnectedRouter} from 'connected-react-router'
import {Switch, Route} from 'react-router'
import {Provider} from 'react-redux'

import setupStore from "app/services/store"

import DashboardPage from "./scenes/dashboard/containers/Page"
import clusterConnect from "./services/cluster/common_connector.js"
import ClusterPage from "./scenes/cluster-overview/components/Page"
import ClusterNodesPage from "./scenes/cluster-node-list/components/Page"
import ClusterNodeAddPage from "./scenes/cluster-node-add/containers/Page"
import ClusterResourceListPage from "./scenes/cluster-resource-list/components/Page";
import ClusterStonithListPage from "./scenes/cluster-stonith-list/components/Page";
import ClusterPropertiesPage from "./scenes/cluster-properties/containers/Page";
import ClusterAclPage from "./scenes/cluster-acl/components/Page";
import Login from "./scenes/login/containers/Login"
import NotificationContainer from "./scenes/notifications/containers/NotificationContainer.js"

import './App.css';

class App extends Component {
  render(){
    const storeInfo = this.props.storeInfo
      ? this.props.storeInfo
      : setupStore("/ui/")
    ;
    return (
      <Provider store={storeInfo.store}>
        <ConnectedRouter history={storeInfo.history}>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={DashboardPage} />
              <Route
                exact path="/cluster/:name/nodes"
                component={clusterConnect(ClusterNodesPage)}
              />
              <Route
                exact path="/cluster/:name/node-add"
                component={clusterConnect(ClusterNodeAddPage)}
              />
              <Route
                exact path="/cluster/:name/resources"
                component={clusterConnect(ClusterResourceListPage)}
              />
              <Route
                exact path="/cluster/:name/stonith"
                component={clusterConnect(ClusterStonithListPage)}
              />
              <Route
                exact path="/cluster/:name/properties"
                component={ClusterPropertiesPage}
              />
              <Route
                exact path="/cluster/:name/acl"
                component={clusterConnect(ClusterAclPage)}
              />
              <Route
                exact path="/cluster/:name"
                component={clusterConnect(ClusterPage)}
              />
              <Route
                render={() => <div>404</div>}
              />
            </Switch>
            <Login/>
            <NotificationContainer/>
          </React.Fragment>
         </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;