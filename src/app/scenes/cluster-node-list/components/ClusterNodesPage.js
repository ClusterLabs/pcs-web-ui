import React from "react";

import routableClusterConnect from "app/services/cluster/common_connector";
import { Page, ClusterPage } from "app/components";

import ClusterNodeList from "./ClusterNodeList";

export const ClusterNodesPage = ({ cluster }) => (
  <ClusterPage clusterName={cluster.name}>
    <Page.Section>
      <ClusterNodeList
        nodeList={cluster.nodeList}
      />
    </Page.Section>
  </ClusterPage>
);

export default routableClusterConnect(ClusterNodesPage);
