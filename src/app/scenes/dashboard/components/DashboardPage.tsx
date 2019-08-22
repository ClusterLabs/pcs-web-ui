import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Page,
  PageSection,
} from "@patternfly/react-core";

import { SET_UP_DATA_READING } from "app/services/data-load/types";
import {
  PageSectionDataLoading,
  PageHeader,
  BackgroundImage,
} from "app/components";

/* eslint-disable no-shadow */
import { DashboardActionType } from "../types";

import * as selectors from "../selectors";
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
            start: { type: DashboardActionType.SYNC_DASHBOARD_DATA },
            stop: { type: DashboardActionType.SYNC_DASHBOARD_DATA_STOP },
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
  const dataLoaded = useSelector(selectors.areDataLoaded);

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
