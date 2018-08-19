import React from 'react';

import ClusterTopMenu from "../../../components/cluster/TopMenu.js"
import ClusterPageContent from "../../../components/cluster/PageContent.js"
import NodeList from "./NodeList.js"

const ClusterNodesPage = ({cluster, match}) => (
  <React.Fragment>

    <ClusterTopMenu clusterName={cluster.name} clusterSection="Nodes"/>

    <ClusterPageContent
      clusterUrlId={match.params.name}
      clusterName={cluster.name}
      activeMenu="nodes"
    >
      <NodeList
        nodeList={cluster.nodeList}
      />
    </ClusterPageContent>
  </React.Fragment>
);
export default ClusterNodesPage;
