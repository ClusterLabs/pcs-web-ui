import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router'

import DashboardPage from "./scenes/dashboard/containers/Page"
import ClusterPage from "./scenes/cluster-overview/containers/Page"
import Login from "./scenes/login/containers/Login"
import './App.css';

class App extends Component {
  render(){
    return (
      <ConnectedRouter history={this.props.history}>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={DashboardPage} />
            <Route exact path="/cluster/:name" component={ClusterPage} />
            <Route render={() => (<div>404</div>)} />
          </Switch>
          <Login/>
        </React.Fragment>
       </ConnectedRouter>
    );
  }
}

export default App;
