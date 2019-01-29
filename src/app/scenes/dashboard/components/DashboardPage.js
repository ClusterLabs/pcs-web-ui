import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { compose } from "recompose";

import withDataLoadOnMount from "app/services/data-load/hoc";
import { Page, withViewForNoData } from "app/components";

import * as dashboardActions from "../actions";
import * as selectors from "../reducer";
import Dashboard from "./Dashboard";

const withDashboardState = connect(
  state => ({
    dashboard: selectors.dashboard(state),
    dataFetch: selectors.dataFetch(state),
  }),
  dispatch => ({
    actions: bindActionCreators(dashboardActions, dispatch),
  }),
);

const withDashboardDataLoad = withDataLoadOnMount(() => ({
  reloadDashboard: {
    // Pure actions (without dispatch binding) here. Start/Stop should be
    // plain objects because they are used in saga.
    start: dashboardActions.syncDashboardData(),
    stop: dashboardActions.syncDashboardDataStop(),
  },
}));

const withViewForNoDashboardData = withViewForNoData(
  ({ actions, dataFetch }) => ({
    isSuccess: dataFetch.isSuccess,
    loadingMessage: "Loading dashboard data",
    isError: dataFetch.isError,
    errorMessage: dataFetch.errorMessage,
    // TODO retry does not work
    retry: () => actions.fetchDashboardData,
  }),
);

const DashboardPageView = ({ dashboard, actions }) => (
  <Page>
    <Page.Section>
      <Dashboard dashboard={dashboard} actions={actions} />
    </Page.Section>
  </Page>
);


export default compose(
  withDashboardState,
  withDashboardDataLoad,
  withViewForNoDashboardData,
)(DashboardPageView);
