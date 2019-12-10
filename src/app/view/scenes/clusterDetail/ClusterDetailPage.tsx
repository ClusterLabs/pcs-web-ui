import React from "react";
import { PageSection } from "@patternfly/react-core";
import { useRouteMatch } from "react-router";

import { Page, Spinner, UrlTabs } from "app/view/common";
import { tabRoutes, join } from "app/view/utils";
import { useClusterState } from "app/services/cluster";
import { NodeListPage } from "app/scenes/node-list";
import { FenceDeviceListPage } from "app/scenes/fence-device-list";

import ClusterDetail from "./ClusterDetail";
import ClusterDetailResources from "./ClusterDetailResources";

const ClusterDetailPage = ({ clusterUrlName, urlPrefix }: {
  clusterUrlName: string;
  urlPrefix: string;
}) => {
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
        <UrlTabs tabSettingsMap={urlMap} currentTab={tab} />
      </PageSection>
      {dataLoaded && (
        <>
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
        </>
      )}
      {!dataLoaded && (
        <PageSection>
          <Spinner text="Loading cluster data" />
        </PageSection>
      )}
    </Page>
  );
};

export default ClusterDetailPage;
