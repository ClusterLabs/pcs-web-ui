import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { PageSection } from "@patternfly/react-core";

import { SET_UP_DATA_READING } from "app/services/data-load/types";
import { SetupDataReading } from "app/services/data-load/actions";
import {
  PageSectionDataLoading,
  Page,
} from "app/common/components";

/* eslint-disable no-shadow */
import * as DashboardAction from "../actions";
import * as selectors from "../selectors";
import Dashboard from "./Dashboard";
import DashboardToolbar from "./DashboardToolbar";

const start: DashboardAction.SyncDashboardData = {
  type: "DASHBOARD_DATA.SYNC",
};

const stop: DashboardAction.SyncDashboardDataStop = {
  type: "DASHBOARD_DATA.SYNC.STOP",
};

const useDashboardSync = () => {
  const dispatch = useDispatch();
  React.useEffect(
    () => {
      dispatch<SetupDataReading>({
        type: SET_UP_DATA_READING,
        payload: {
          reloadDashboard: { start, stop },
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
    <Page>
      <PageSection>
        <DashboardToolbar />
      </PageSection>
      <PageSectionDataLoading done={dataLoaded}>
        <Dashboard dashboard={dashboard} />
      </PageSectionDataLoading>
    </Page>
  );
};

export default DashboardPage;
