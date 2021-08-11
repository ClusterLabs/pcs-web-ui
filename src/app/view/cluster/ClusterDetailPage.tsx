import React from "react";
import { PageSection, Stack, StackItem } from "@patternfly/react-core";

import {
  EmptyStateSpinner,
  Page,
  SelectedClusterProvider,
  UrlTabs,
  join,
  useClusterState,
  useMatch,
  useRoutesAnalysis,
} from "app/view/share";

import { NodesPage } from "./nodes";
import { ResourcesPage } from "./resources";
import { FenceDevicePage } from "./fenceDevices";
import { ConstraintsPage } from "./constraints";
import { ClusterPropertiesPage } from "./properties";
import { ClusterDetail } from "./ClusterDetail";
import { ClusterDetailBreadcrumb } from "./ClusterDetailBreadcrumb";
import { ClusterPermissionsPage } from "./permissions";

export const ClusterDetailPage: React.FC<{
  clusterName: string;
  urlPrefix: string;
}> = ({ clusterName, urlPrefix }) => {
  const { dataLoaded } = useClusterState(clusterName);

  const { tab, urlMap, url } = useRoutesAnalysis("Detail", {
    Detail: useMatch({ path: join(urlPrefix), exact: true }),
    Nodes: useMatch(join(urlPrefix, "nodes")),
    Resources: useMatch(join(urlPrefix, "resources")),
    "Fence Devices": useMatch(join(urlPrefix, "fence-devices")),
    Constraints: useMatch(join(urlPrefix, "constraints")),
    Properties: useMatch(join(urlPrefix, "properties")),
    Permissions: useMatch(join(urlPrefix, "permissions")),
  });

  return (
    <Page>
      <PageSection variant="light">
        <Stack hasGutter>
          <StackItem>
            <ClusterDetailBreadcrumb clusterName={clusterName} />
          </StackItem>
          <StackItem>
            <UrlTabs tabSettingsMap={urlMap} currentTab={tab} label="cluster" />
          </StackItem>
        </Stack>
      </PageSection>
      {dataLoaded && (
        <SelectedClusterProvider value={clusterName}>
          {tab === "Detail" && <ClusterDetail />}
          {tab === "Resources" && <ResourcesPage urlPrefix={url} />}
          {tab === "Nodes" && <NodesPage urlPrefix={url} />}
          {tab === "Fence Devices" && <FenceDevicePage urlPrefix={url} />}
          {tab === "Constraints" && (
            <ConstraintsPage clusterName={clusterName} />
          )}
          {tab === "Properties" && <ClusterPropertiesPage />}
          {tab === "Permissions" && <ClusterPermissionsPage />}
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
