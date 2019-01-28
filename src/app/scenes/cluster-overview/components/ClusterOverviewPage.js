import React from "react";

import routableClusterConnect from "app/services/cluster/common_connector";
import { Page, ClusterPage } from "app/components";

import ClusterOverview from "./ClusterOverview";

export const ClusterOverviewPage = ({ cluster }) => (
  <ClusterPage clusterName={cluster.name}>
    <Page.Section>
      <Page.Title size="xl">Settings</Page.Title>
      <ClusterOverview cluster={cluster} />
    </Page.Section>
  </ClusterPage>
);

export default routableClusterConnect(ClusterOverviewPage);
