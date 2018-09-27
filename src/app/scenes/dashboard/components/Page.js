import React from "react";
import { Container, Loader, Breadcrumb } from "semantic-ui-react";

import TopMenu from "app/components/TopMenu";
import LoadPageProblem from "app/components/LoadPageProblem";

import Dashboard from "./Dashboard";

export default class Page extends React.Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.fetchDashboardData();
  }

  render() {
    const { dashboard, actions } = this.props;
    return (
      <React.Fragment>
        <TopMenu
          breadcrumbs={(
            <Breadcrumb>
              <Breadcrumb.Section active as={() => <span>Clusters</span>} />
            </Breadcrumb>
          )}
        />
        <Container>
          {
            dashboard.fetch.result === true
            &&
            <Dashboard dashboard={dashboard} actions={actions} />
          }
          {
            dashboard.fetch.result === undefined
            &&
            <Loader active>Loading dashboard data.</Loader>
          }
          {
            typeof dashboard.fetch.result === "object"
            && (
              <LoadPageProblem
                retry={actions.fetchDashboardData}
                header="Cannot load dashboard data"
                error={dashboard.fetch.result}
              />
            )
          }
        </Container>
      </React.Fragment>
    );
  }
}
