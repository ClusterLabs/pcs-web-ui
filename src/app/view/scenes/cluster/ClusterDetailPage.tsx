import React from "react";
import { useDispatch } from "react-redux";
import {
  PageSection,
  Breadcrumb,
  BreadcrumbItem,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

import { Action } from "app/actions";
import { Page, Spinner, UrlTabs } from "app/view/common";
import { tabRoutes, join } from "app/view/utils";
import { useClusterState } from "app/view/hooks";

import { NodeListPage } from "./nodes";
import { FenceDeviceListPage } from "./fenceDevices";
import { ClusterDetailResources } from "./resources";
import { ClusterDetail } from "./ClusterDetail";
import { SelectedClusterProvider } from "./SelectedClusterContext";

export const ClusterDetailPage = ({ clusterUrlName, urlPrefix }: {
  clusterUrlName: string;
  urlPrefix: string;
}) => {
  const dispatch = useDispatch();
  const { dataLoaded, cluster } = useClusterState(clusterUrlName);

  const urlMap = {
    Detail: join(urlPrefix),
    Nodes: join(urlPrefix, "nodes"),
    Resources: join(urlPrefix, "resources"),
    "Fence Devices": join(urlPrefix, "fence-devices"),
  };

  const { tab, url } = tabRoutes.selectCurrent<keyof typeof urlMap>("Detail", {
    Detail: useRouteMatch({ path: urlMap.Detail, exact: true }),
    Resources: useRouteMatch(urlMap.Resources),
    Nodes: useRouteMatch(urlMap.Nodes),
    "Fence Devices": useRouteMatch(urlMap["Fence Devices"]),
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
                onClick={() => dispatch<Action>({
                  type: "CLUSTER_DATA.REFRESH",
                })}
              >
                {clusterUrlName}
              </BreadcrumbItem>
            </Breadcrumb>
          </StackItem>
          <StackItem>
            <UrlTabs tabSettingsMap={urlMap} currentTab={tab} />
          </StackItem>
        </Stack>
      </PageSection>
      {dataLoaded && (
        <SelectedClusterProvider value={clusterUrlName}>
          {tab === "Detail" && (
            <ClusterDetail />
          )}
          {tab === "Resources" && (
            <ClusterDetailResources cluster={cluster} urlPrefix={url} />
          )}
          {tab === "Nodes" && (
            <NodeListPage cluster={cluster} urlPrefix={url} />
          )}
          {tab === "Fence Devices" && (
            <FenceDeviceListPage cluster={cluster} urlPrefix={url} />
          )}
        </SelectedClusterProvider>
      )}
      {!dataLoaded && (
        <PageSection>
          <Spinner text="Loading cluster data" />
        </PageSection>
      )}
    </Page>
  );
};
