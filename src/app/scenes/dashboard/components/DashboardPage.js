import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { compose } from "recompose";

import * as rawDataLoadActions from "app/services/data-load/actions";
import { loadDataOnMount } from "app/services/data-load/hoc";
import { withPageLoading } from "app/components";

import * as dashboardActions from "../actions";
import DashboardPageView from "./DashboardPageView";

const withDashboardDataLoad = loadDataOnMount(() => ({
  reloadDashboard: {
    start: dashboardActions.syncDashboardData(),
    stop: dashboardActions.syncDashboardDataStop(),
  },
}));

const withLoadingState = withPageLoading(
  ({ dashboard }) => dashboard.fetch.result === undefined,
  ({ actions, dashboard }) => ({
    loadingMsg: "Loading dashboard data",
    isError: typeof dashboard.fetch.result === "object",
    errorMsg: dashboard.fetch.result,
    // TODO retry does not work
    retry: () => actions.fetchDashboardData,
  }),
);

const withDashboardState = connect(
  state => ({
    dashboard: state.dashboard,
  }),
  dispatch => ({
    actions: bindActionCreators(dashboardActions, dispatch),
    dataLoadActions: bindActionCreators(rawDataLoadActions, dispatch),
  }),
);

export default compose(
  withDashboardState,
  withDashboardDataLoad,
  withLoadingState,
)(DashboardPageView);
