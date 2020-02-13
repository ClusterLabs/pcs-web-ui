import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Breadcrumb,
  BreadcrumbItem,
  PageSection,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import { Action } from "app/actions";
import { selectors } from "app/store";
import { PageSectionDataLoading, Page } from "app/view/common";

import { Dashboard } from "./Dashboard";
import { DashboardToolbar } from "./DashboardToolbar";

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

export const DashboardPage = ({ urlPrefix }: { urlPrefix: string }) => {
  useDashboardSync();
  const dispatch = useDispatch();
  const dashboard = useSelector(selectors.getDashboard);
  const dataLoaded = useSelector(selectors.dashboardAreDataLoaded);

  return (
    <Page>
      <PageSection variant="light">
        <Stack gutter="md">
          <StackItem>
            <Breadcrumb>
              <BreadcrumbItem
                isActive
                onClick={() => dispatch<Action>({
                  type: "DASHBOARD_DATA.REFRESH",
                })}
              >
                Clusters
              </BreadcrumbItem>
            </Breadcrumb>
          </StackItem>
          <StackItem>
            <DashboardToolbar urlPrefix={urlPrefix} />
          </StackItem>
        </Stack>
      </PageSection>
      <PageSectionDataLoading done={dataLoaded}>
        <Dashboard dashboard={dashboard} />
      </PageSectionDataLoading>
    </Page>
  );
};
