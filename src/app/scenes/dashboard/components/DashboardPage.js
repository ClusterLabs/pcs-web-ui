import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Page, PageSection } from "@patternfly/react-core";

import { setUpDataReading } from "app/services/data-load/actions";
import {
  PageSectionDataLoading,
  PageHeader,
  BackgroundImage,
} from "app/components";

/* eslint-disable no-shadow */
import { syncDashboardData, syncDashboardDataStop } from "../actions";
import { selectors } from "../plugin";
import Dashboard from "./Dashboard";
import DashboardAggregations from "./DashboardAggregations";
import DashboardToolbar from "./DashboardToolbar";

const useDashboardSync = () => {
  const dispatch = useDispatch();
  React.useEffect(
    () => {
      dispatch(
        setUpDataReading({
          reloadDashboard: {
            // Pure actions (without dispatch binding) here. Start/Stop should
            // be plain objects because they are used in saga.
            start: syncDashboardData(),
            stop: syncDashboardDataStop(),
          },
        }),
      );
    },
    [],
  );
};

const DashboardPage = () => {
  useDashboardSync();
  const dashboard = useSelector(selectors.getDashboard);
  const dataLoaded = useSelector(
    state => selectors.getDashboardDataFetch(state).isSuccess,
  );

  return (
    <React.Fragment>
      <BackgroundImage />
      <Page header={<PageHeader />}>
        <PageSection variant="dark">
          <DashboardAggregations dashboard={dashboard} />
        </PageSection>
        <PageSection>
          <DashboardToolbar />
        </PageSection>
        <PageSectionDataLoading done={dataLoaded}>
          <Dashboard dashboard={dashboard} />
        </PageSectionDataLoading>
      </Page>
    </React.Fragment>
  );
};

export default DashboardPage;
