import React from "react";
import {useSelector} from "react-redux";
import {
  Breadcrumb,
  BreadcrumbItem,
  PageSection,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {selectors} from "app/store";
import {
  EmptyStateBackendNotFound,
  EmptyStateSpinner,
  Page,
  PageToolbar,
  useDispatch,
} from "app/view/share";

import {DashboardClusterList} from "./clusterList";
import {DashboardToolbar} from "./DashboardToolbar";

const useDashboardSync = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({
      type: "DATA_READING.SET_UP",
      payload: {
        behavior: "add",
        readings: [
          {
            id: "syncDashboard",
            start: {type: "CLUSTER.LIST.SYNC"},
            stop: {type: "CLUSTER.LIST.SYNC.STOP"},
          },
        ],
      },
    });
  }, [dispatch]);
};

export const DashboardApp = () => {
  useDashboardSync();
  const dispatch = useDispatch();
  const importedClusterNameList = useSelector(selectors.getImportedClusterList);
  const dataLoadingStatus = useSelector(selectors.dashboardGetLoadingStatus);

  return (
    <Page>
      {notifications => (
        <>
          <PageSection variant="light" hasShadowBottom>
            <Stack hasGutter>
              <PageToolbar
                breadcrumbs={
                  <Breadcrumb>
                    <BreadcrumbItem
                      component="span"
                      isActive
                      onClick={() => dispatch({type: "CLUSTER.LIST.REFRESH"})}
                    >
                      Clusters
                    </BreadcrumbItem>
                  </Breadcrumb>
                }
                notifications={notifications}
              />
              <StackItem>
                <DashboardToolbar />
              </StackItem>
            </Stack>
          </PageSection>
          <PageSection {...testMarks.dashboard.mark}>
            {dataLoadingStatus === "loaded" && (
              <DashboardClusterList
                importedClusterNameList={importedClusterNameList}
              />
            )}
            {dataLoadingStatus === "not-loaded" && (
              <EmptyStateSpinner title="Loading data" />
            )}
            {dataLoadingStatus === "not-found" && <EmptyStateBackendNotFound />}
          </PageSection>
        </>
      )}
    </Page>
  );
};
