import React from 'react';
import {Container, Loader, Breadcrumb} from 'semantic-ui-react'

import Dashboard from "./Dashboard.js"
import TopMenu from "../../../components/TopMenu.js"

export default class Page extends React.Component{
  componentDidMount(){
    this.props.actions.fetchDashboardData();
  }
  render() {
    return (
      <React.Fragment>
        <TopMenu breadcrumbs={
          <Breadcrumb>
            <Breadcrumb.Section active as={() => <span>Clusters</span>}/>
          </Breadcrumb>
        }/>
        <Container>
          {
            this.props.dashboard.loaded
            ? <Dashboard
                dashboard={this.props.dashboard}
                actions={this.props.actions}
              />
            : <Loader active>Loading dashboard data.</Loader>
          }
        </Container>
      </React.Fragment>
    )
  }
};
