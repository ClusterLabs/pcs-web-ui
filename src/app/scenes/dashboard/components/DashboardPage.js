import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import withDataSyncStartOnMount from "app/services/data-load/hoc";
import { Page, withViewForNoData } from "app/components";

/* eslint-disable no-shadow */
import {
  syncDashboardData,
  syncDashboardDataStop,
} from "../actions";
import * as selectors from "../reducer";
import Dashboard from "./Dashboard";
import DashboardAggregations from "./DashboardAggregations";

const withDashboardState = connect(
  state => ({
    dashboard: selectors.getDashboard(state),
    dataFetch: selectors.getDashboardDataFetch(state),
  }),
);

const withDashboardDataLoad = withDataSyncStartOnMount(() => ({
  reloadDashboard: {
    // Pure actions (without dispatch binding) here. Start/Stop should be
    // plain objects because they are used in saga.
    start: syncDashboardData(),
    stop: syncDashboardDataStop(),
  },
}));

const withViewForNoDashboardData = withViewForNoData(
  ({ dataFetch }) => ({
    isSuccess: dataFetch.isSuccess,
    loadingMessage: "Loading dashboard data",
    breadcrumbs: false,
  }),
);


const DashboardPageView = ({ dashboard }) => (
  <Page breadcrumbs={false}>
    <Page.Section variant="dark">
      <DashboardAggregations dashboard={dashboard} />
    </Page.Section>
    <Page.Section>
      <Dashboard dashboard={dashboard} />
    </Page.Section>
  </Page>
);


export default compose(
  withDashboardState,
  withDashboardDataLoad,
  withViewForNoDashboardData,
)(DashboardPageView);
