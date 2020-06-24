import React from "react";
import { useDispatch } from "react-redux";
import {
  Breadcrumb,
  BreadcrumbItem,
  EmptyState,
  EmptyStateIcon,
  PageSection,
  Spinner,
  Stack,
  StackItem,
  Title,
} from "@patternfly/react-core";
import { Link } from "react-router-dom";

import { Action } from "app/actions";
import { GroupDetailView, Page, UrlTabs } from "app/view/common";
import { join, useMatch, useRoutesAnalysis } from "app/view/utils";
import { useClusterState } from "app/view/hooks";

import { NodeDetailPage, NodeList } from "./nodes";
import { FenceDeviceDetailPage, FenceDeviceList } from "./fenceDevices";
import { ResourceDetailPage, ResourceTree } from "./resources";
import { ConstraintsPage } from "./constraints";
import { ClusterDetail } from "./ClusterDetail";
import { SelectedClusterProvider } from "./SelectedClusterContext";

export const ClusterDetailPage = ({
  clusterUrlName,
  urlPrefix,
}: {
  clusterUrlName: string;
  urlPrefix: string;
}) => {
  const dispatch = useDispatch();
  const { dataLoaded, cluster } = useClusterState(clusterUrlName);

  const { tab, urlMap, url } = useRoutesAnalysis("Detail", {
    Detail: useMatch({ path: join(urlPrefix), exact: true }),
    Nodes: useMatch(join(urlPrefix, "nodes")),
    Resources: useMatch(join(urlPrefix, "resources")),
    "Fence Devices": useMatch(join(urlPrefix, "fence-devices")),
    Constraints: useMatch(join(urlPrefix, "constraints")),
  });

  return (
    <Page>
      <PageSection variant="light">
        <Stack gutter="md">
          <StackItem>
            <Breadcrumb>
              <BreadcrumbItem component="span">
                <Link to="/">Clusters</Link>
              </BreadcrumbItem>
              <BreadcrumbItem
                isActive
                onClick={() =>
                  dispatch<Action>({
                    type: "CLUSTER_DATA.REFRESH",
                    payload: { clusterUrlName },
                  })
                }
              >
                {clusterUrlName}
              </BreadcrumbItem>
            </Breadcrumb>
          </StackItem>
          <StackItem>
            <UrlTabs tabSettingsMap={urlMap} currentTab={tab} label="cluster" />
          </StackItem>
        </Stack>
      </PageSection>
      {dataLoaded && (
        <SelectedClusterProvider value={clusterUrlName}>
          {tab === "Detail" && <ClusterDetail />}
          {tab === "Resources" && (
            <GroupDetailView
              urlPrefix={url}
              groupCard={<ResourceTree resourceTree={cluster.resourceTree} />}
              detailCard={<ResourceDetailPage />}
            />
          )}
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
        </SelectedClusterProvider>
      )}
      {!dataLoaded && (
        <PageSection>
          <EmptyState style={{ margin: "auto" }}>
            <EmptyStateIcon variant="container" component={Spinner} />
            <Title size="lg">Loading cluster data</Title>
          </EmptyState>
        </PageSection>
      )}
    </Page>
  );
};
