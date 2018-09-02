import React from 'react';

import ClusterPageContent from "~/components/cluster/PageContent.js"
import ClusterTopMenu from "~/components/cluster/TopMenu.js"

import ResourceList from "./ResourceList.js"

const ClusterResourcesPage = ({cluster, match}) => (
  <React.Fragment>

    <ClusterTopMenu clusterName={cluster.name} clusterSection="Resources"/>

    <ClusterPageContent
      clusterUrlId={match.params.name}
      clusterName={cluster.name}
      activeMenu="resources"
    >
      <ResourceList
        resourceList={cluster.resourceList}
      />
    </ClusterPageContent>

  </React.Fragment>
);
export default ClusterResourcesPage;
