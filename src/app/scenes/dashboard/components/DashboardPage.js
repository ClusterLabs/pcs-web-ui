import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Page,
  PageSection,
} from "@patternfly/react-core";
/* eslint-disable no-unused-vars */
// this is a temporary hack to load table styles to page...
import { Table } from "@patternfly/react-table";
/* eslint-enable no-unused-vars */

import { SET_UP_DATA_READING } from "app/services/data-load/types";
import {
  PageSectionDataLoading,
  PageHeader,
  BackgroundImage,
} from "app/components";

/* eslint-disable no-shadow */
import {
  SYNC_DASHBOARD_DATA,
  SYNC_DASHBOARD_DATA_STOP,
} from "../types";

import { selectors } from "../plugin";
import Dashboard from "./Dashboard";
import DashboardToolbar from "./DashboardToolbar";

const useDashboardSync = () => {
  const dispatch = useDispatch();
  React.useEffect(
    () => {
      dispatch({
        type: SET_UP_DATA_READING,
        payload: {
          reloadDashboard: {
            start: { type: SYNC_DASHBOARD_DATA },
            stop: { type: SYNC_DASHBOARD_DATA_STOP },
          },
        },
      });
    },
    [dispatch],
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
