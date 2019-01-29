import React from "react";

import routableClusterConnect from "app/services/cluster/common_connector";
import { Page } from "app/components";

import ClusterNodeList from "./ClusterNodeList";

export const ClusterNodesPage = ({ cluster, sidebarNavigation }) => (
  <Page sidebarNavigation={sidebarNavigation}>
    <Page.Section>
      <ClusterNodeList
        nodeList={cluster.nodeList}
      />
    </Page.Section>
  </Page>
);

export default routableClusterConnect(ClusterNodesPage);
