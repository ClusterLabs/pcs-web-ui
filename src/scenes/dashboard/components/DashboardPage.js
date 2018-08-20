import React from 'react';
import {Menu, Header, Container, Loader} from 'semantic-ui-react'

import Dashboard from "./Dashboard.js"

export default class DashboardPage extends React.Component{
  componentDidMount(){
    if( ! this.props.dashboard.loaded){
      this.props.actions.fetchDashboardData();
    }
  }
  render() {
    return (
      <div>
        <Menu inverted>
          <Menu.Item>
            High Availability<br/>
            Management
          </Menu.Item>
          {
            ! this.props.global.loginRequired
            &&
            <Menu.Item name='Logout'
              data-role="logout"
              onClick={this.props.globalActions.logout}
              position="right"
            />
          }
        </Menu>
        <Container>
          <Header as="h2">Dashboard</Header>
          {
            this.props.dashboard.loaded
            ? <Dashboard
                dashboard={this.props.dashboard}
                actions={this.props.actions}
              />
            : <Loader active>Loading dashboard data...</Loader>
          }
        </Container>
      </div>
    )
  }
};
