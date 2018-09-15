import React from 'react';
import {Container, Loader, Breadcrumb} from 'semantic-ui-react'

import TopMenu from "app/components/TopMenu.js"
import LoadPageProblem from "app/components/LoadPageProblem"

import Dashboard from "./Dashboard.js"

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
            this.props.dashboard.fetch.result === true
            &&
            <Dashboard
                dashboard={this.props.dashboard}
                actions={this.props.actions}
              />
          }
          {
            this.props.dashboard.fetch.result === undefined
            &&
            <Loader active>Loading dashboard data.</Loader>
          }
          {
            typeof this.props.dashboard.fetch.result === 'object'
            &&
            <LoadPageProblem
              retry={this.props.actions.fetchDashboardData}
              header="Cannot load dashboard data"
              error={this.props.dashboard.fetch.result}
            />
          }
        </Container>
      </React.Fragment>
    )
  }
};
