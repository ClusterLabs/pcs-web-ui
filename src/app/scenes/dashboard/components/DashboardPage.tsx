import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { PageSection } from "@patternfly/react-core";

import * as DataReadingAction from "app/services/data-load/actions";
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
      dispatch<DataReadingAction.SetupDataReading>({
        type: "DATA_READING.SET_UP",
        payload: {
          reloadDashboard: { start, stop },
        },
      });
    },
    [dispatch],
  );
};

const DashboardPage = ({ urlPrefix }: { urlPrefix: string }) => {
  useDashboardSync();
  const dashboard = useSelector(selectors.getDashboard);
  const dataLoaded = useSelector(selectors.areDataLoaded);

  return (
    <Page>
      <PageSection>
        <DashboardToolbar urlPrefix={urlPrefix} />
      </PageSection>
      <PageSectionDataLoading done={dataLoaded}>
        <Dashboard dashboard={dashboard} />
      </PageSectionDataLoading>
    </Page>
  );
};

export default DashboardPage;
