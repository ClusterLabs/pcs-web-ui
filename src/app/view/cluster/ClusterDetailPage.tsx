import React from "react";
import { PageSection, Stack, StackItem } from "@patternfly/react-core";

import { Router } from "app/view/share";
import {
  EmptyStateSpinner,
  Page,
  SelectedClusterProvider,
  UrlTabs,
  useUrlTabs,
} from "app/view/share";
import { useClusterState } from "app/view/share";

import { NodesPage } from "./nodes";
import { ResourcesPage } from "./resources";
import { FenceDevicePage } from "./fenceDevices";
import { ConstraintsPage } from "./constraints";
import { ClusterPropertiesPage } from "./properties";
import { ClusterDetail } from "./ClusterDetail";
import { ClusterDetailBreadcrumb } from "./ClusterDetailBreadcrumb";
import { ClusterPermissionsPage } from "./permissions";

export const clusterPageTabList = [
  "detail",
  "nodes",
  "resources",
  "fence-devices",
  "constraints",
  "properties",
  "permissions",
] as const;

export const ClusterDetailPage: React.FC<{ clusterName: string }> = ({
  clusterName,
}) => {
  const { dataLoaded } = useClusterState(clusterName);
  const { currentTab, matchedContext } = useUrlTabs(clusterPageTabList);

  return (
    <Page>
      <PageSection variant="light">
        <Stack hasGutter>
          <StackItem>
            <ClusterDetailBreadcrumb clusterName={clusterName} />
          </StackItem>
          <StackItem>
            <UrlTabs
              tabList={clusterPageTabList}
              currentTab={currentTab}
              data-test="cluster"
            />
          </StackItem>
        </Stack>
      </PageSection>
      {dataLoaded && (
        <SelectedClusterProvider value={clusterName}>
          <Router base={matchedContext}>
            {currentTab === "detail" && <ClusterDetail />}
            {currentTab === "nodes" && <NodesPage />}
            {currentTab === "resources" && <ResourcesPage />}
            {currentTab === "fence-devices" && <FenceDevicePage />}
            {currentTab === "constraints" && (
              <ConstraintsPage clusterName={clusterName} />
            )}
            {currentTab === "properties" && <ClusterPropertiesPage />}
            {currentTab === "permissions" && <ClusterPermissionsPage />}
          </Router>
        </SelectedClusterProvider>
      )}
      {!dataLoaded && (
        <PageSection>
          <EmptyStateSpinner title="Loading cluster data" />
        </PageSection>
      )}
    </Page>
  );
};
