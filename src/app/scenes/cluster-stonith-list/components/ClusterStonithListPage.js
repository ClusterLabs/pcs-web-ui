import React from "react";

import routableClusterConnect from "app/services/cluster/common_connector";
import { Page } from "app/components";

import ClusterStonithList from "./ClusterStonithList";

export const ClusterStonithListPage = ({ cluster, sidebarNavigation }) => (
  <Page sidebarNavigation={sidebarNavigation}>
    <Page.Section>
      <ClusterStonithList
        stonithList={cluster.stonithList}
      />
    </Page.Section>
  </Page>
);
export default routableClusterConnect(ClusterStonithListPage);
