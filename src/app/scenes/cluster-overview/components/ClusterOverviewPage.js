import React from "react";

import routableClusterConnect from "app/services/cluster/common_connector";
import { Page } from "app/components";

import ClusterOverview from "./ClusterOverview";

export const ClusterOverviewPage = ({ cluster, sidebarNavigation }) => (
  <Page sidebarNavigation={sidebarNavigation}>
    <Page.Section>
      <Page.Title size="xl">Settings</Page.Title>
      <ClusterOverview cluster={cluster} />
    </Page.Section>
  </Page>
);

export default routableClusterConnect(ClusterOverviewPage);
