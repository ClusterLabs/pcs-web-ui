import React from "react";
import {useSelector} from "react-redux";
import {
  Alert,
  AlertActionCloseButton,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  PageSection,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import {InfoCircleIcon} from "@patternfly/react-icons";

import {testMarks} from "app/view/dataTest";
import {selectors} from "app/store";
import {
  EmptyStateBackendNotFound,
  EmptyStateSpinner,
  LoadingDataLabel,
  Page,
  PageToolbar,
  useDispatch,
} from "app/view/share";

import {DashboardClusterList} from "./clusterList";
import {DashboardToolbar} from "./DashboardToolbar";
import {useDashboardDeprecationDismiss} from "./useDashboardDeprecationDismiss";

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
  const loading = useSelector(selectors.dashboardGetLoadingStatus);
  const {dismissed, dismiss, restore} = useDashboardDeprecationDismiss();

  return (
    <Page>
      {notifications => (
        <>
          <PageSection variant="light" hasShadowBottom>
            <Stack hasGutter>
              <PageToolbar
                breadcrumbs={
                  <Breadcrumb>
                    <BreadcrumbItem component="span" isActive>
                      Clusters
                      <LoadingDataLabel
                        onClick={() => dispatch({type: "CLUSTER.LIST.REFRESH"})}
                        when={loading.when}
                        isLoading={loading.currently}
                      />
                      {dismissed && (
                        <Button
                          variant="link"
                          icon={<InfoCircleIcon />}
                          onClick={restore}
                          {...testMarks.dashboard.deprecationAlert.showNotices
                            .mark}
                        >
                          Deprecation
                        </Button>
                      )}
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
          {!dismissed && (
            <PageSection>
              <Alert
                variant="info"
                isInline
                title="Multi-cluster management is deprecated"
                actionClose={
                  <AlertActionCloseButton
                    {...testMarks.dashboard.deprecationAlert.close.mark}
                    onClose={dismiss}
                  />
                }
                {...testMarks.dashboard.deprecationAlert.mark}
              >
                Management of multiple clusters from this interface will be
                removed in a future version. The web UI will be focused on
                managing only the cluster on which the web UI backend is
                running.
              </Alert>
            </PageSection>
          )}
          <PageSection {...testMarks.dashboard.mark}>
            {loading.status === "SUCCESS" && (
              <DashboardClusterList
                importedClusterNameList={importedClusterNameList}
              />
            )}
            {loading.status === "IN_PROGRESS" ||
              (loading.status === "NOT_STARTED" && (
                <EmptyStateSpinner title="Loading data" />
              ))}
            {loading.status === "BACKEND_NOT_FOUND" && (
              <EmptyStateBackendNotFound />
            )}
          </PageSection>
        </>
      )}
    </Page>
  );
};
