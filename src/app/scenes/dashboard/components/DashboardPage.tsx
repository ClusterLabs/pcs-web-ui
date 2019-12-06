import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { PageSection } from "@patternfly/react-core";

import {
  PageSectionDataLoading,
  Page,
} from "app/common/components";
import { Action } from "app/actions";

import * as selectors from "../selectors";
import Dashboard from "./Dashboard";
import DashboardToolbar from "./DashboardToolbar";

const useDashboardSync = () => {
  const dispatch = useDispatch();
  React.useEffect(
    () => {
      dispatch<Action>({
        type: "DATA_READING.SET_UP",
        payload: {
          reloadDashboard: {
            start: { type: "DASHBOARD_DATA.SYNC" },
            stop: { type: "DASHBOARD_DATA.SYNC.STOP" },
          },
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
