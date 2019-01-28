import React from "react";

import routableClusterConnect from "app/services/cluster/common_connector";
import { Page, ClusterPage } from "app/components";

import ClusterStonithList from "./ClusterStonithList";

export const ClusterStonithListPage = ({ cluster }) => (
  <ClusterPage clusterName={cluster.name}>
    <Page.Section>
      <ClusterStonithList
        stonithList={cluster.stonithList}
      />
    </Page.Section>
  </ClusterPage>
);
export default routableClusterConnect(ClusterStonithListPage);
