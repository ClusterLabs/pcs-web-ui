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
} from "app/view";

import { NodesPage } from "./nodes";
import { ResourcesPage } from "./resources";
import { FenceDevicePage } from "./fenceDevices";
import { ConstraintsPage } from "./constraints";
import { ClusterPropertiesPage } from "./properties";
import { ClusterDetail } from "./ClusterDetail";
import { ClusterDetailBreadcrumb } from "./ClusterDetailBreadcrumb";

export const ClusterDetailPage = ({
  clusterUrlName,
  urlPrefix,
}: {
  clusterUrlName: string;
  urlPrefix: string;
}) => {
  const { dataLoaded } = useClusterState(clusterUrlName);

  const { tab, urlMap, url } = useRoutesAnalysis("Detail", {
    Detail: useMatch({ path: join(urlPrefix), exact: true }),
    Nodes: useMatch(join(urlPrefix, "nodes")),
    Resources: useMatch(join(urlPrefix, "resources")),
    "Fence Devices": useMatch(join(urlPrefix, "fence-devices")),
    Constraints: useMatch(join(urlPrefix, "constraints")),
    Properties: useMatch(join(urlPrefix, "properties")),
  });

  return (
    <Page>
      <PageSection variant="light">
        <Stack hasGutter>
          <StackItem>
            <ClusterDetailBreadcrumb clusterUrlName={clusterUrlName} />
          </StackItem>
          <StackItem>
            <UrlTabs tabSettingsMap={urlMap} currentTab={tab} label="cluster" />
          </StackItem>
        </Stack>
      </PageSection>
      {dataLoaded && (
        <SelectedClusterProvider value={clusterUrlName}>
          {tab === "Detail" && <ClusterDetail />}
          {tab === "Resources" && <ResourcesPage urlPrefix={url} />}
          {tab === "Nodes" && <NodesPage urlPrefix={url} />}
          {tab === "Fence Devices" && <FenceDevicePage urlPrefix={url} />}
          {tab === "Constraints" && (
            <ConstraintsPage clusterUrlName={clusterUrlName} />
          )}
          {tab === "Properties" && (
            <ClusterPropertiesPage clusterUrlName={clusterUrlName} />
          )}
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
