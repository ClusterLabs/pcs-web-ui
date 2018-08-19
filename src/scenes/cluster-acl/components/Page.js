import React from 'react';

import ClusterTopMenu from "../../../components/cluster/TopMenu.js"
import ClusterPageContent from "../../../components/cluster/PageContent.js"

export default ({cluster, match}) => (
  <React.Fragment>

    <ClusterTopMenu
      clusterName={cluster.name}
      clusterSection="Access control list"
    />

    <ClusterPageContent
      clusterUrlId={match.params.name}
      clusterName={cluster.name}
      activeMenu="acl"
    >
    </ClusterPageContent>

  </React.Fragment>
);
