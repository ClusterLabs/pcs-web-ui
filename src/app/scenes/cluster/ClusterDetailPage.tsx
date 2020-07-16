import React from "react";
import {
  EmptyState,
  EmptyStateIcon,
  PageSection,
  Spinner,
  Stack,
  StackItem,
  Title,
} from "@patternfly/react-core";

import {
  GroupDetailView,
  Page,
  SelectedClusterProvider,
  UrlTabs,
  join,
  useClusterState,
  useMatch,
  useRoutesAnalysis,
} from "app/view";

import { NodeDetailPage, NodeList } from "./nodes";
import { FenceDeviceDetailPage, FenceDeviceList } from "./fenceDevices";
import { ResourcesPage } from "./resources";
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
  const { dataLoaded, cluster } = useClusterState(clusterUrlName);

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
          {tab === "Nodes" && (
            <GroupDetailView
              urlPrefix={url}
              groupCard={<NodeList nodeList={cluster.nodeList} />}
              detailCard={<NodeDetailPage />}
            />
          )}
          {tab === "Fence Devices" && (
            <GroupDetailView
              urlPrefix={url}
              detailCard={<FenceDeviceDetailPage />}
              groupCard={
                <FenceDeviceList fenceDeviceList={cluster.fenceDeviceList} />
              }
            />
          )}
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
          <EmptyState style={{ margin: "auto" }}>
            <EmptyStateIcon variant="container" component={Spinner} />
            <Title size="lg" headingLevel="h3">
              Loading cluster data
            </Title>
          </EmptyState>
        </PageSection>
      )}
    </Page>
  );
};
