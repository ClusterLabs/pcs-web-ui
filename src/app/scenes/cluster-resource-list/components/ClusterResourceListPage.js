import React from "react";

import routableClusterConnect from "app/services/cluster/common_connector";
import { Page } from "app/components";

import ResourceList from "./ResourceList";

export const ClusterResourceListPage = ({ cluster, sidebarNavigation }) => (
  <Page sidebarNavigation={sidebarNavigation}>
    <Page.Section>
      <ResourceList
        resourceList={cluster.resourceList}
      />
    </Page.Section>
  </Page>
);
export default routableClusterConnect(ClusterResourceListPage);
