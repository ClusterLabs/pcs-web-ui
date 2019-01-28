import React from "react";

import routableClusterConnect from "app/services/cluster/common_connector";
import { Page, ClusterPage } from "app/components";

import ResourceList from "./ResourceList";

export const ClusterResourceListPage = ({ cluster }) => (
  <ClusterPage clusterName={cluster.name}>
    <Page.Section>
      <ResourceList
        resourceList={cluster.resourceList}
      />
    </Page.Section>
  </ClusterPage>
);
export default routableClusterConnect(ClusterResourceListPage);
