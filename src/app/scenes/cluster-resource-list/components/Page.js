import React from "react";

import ClusterDataPage from "app/components/cluster/ClusterDataPage";
import ClusterTopMenu from "app/components/cluster/TopMenu";

import ResourceList from "./ResourceList";

const ClusterResourcesPage = ({ cluster, match, actions }) => (
  <React.Fragment>

    <ClusterTopMenu clusterName={match.params.name} clusterSection="Resources" />

    <ClusterDataPage
      clusterUrlId={match.params.name}
      cluster={cluster}
      activeMenu="resources"
      actions={actions}
    >
      <ResourceList
        resourceList={cluster.data.resourceList}
      />
    </ClusterDataPage>

  </React.Fragment>
);
export default ClusterResourcesPage;
