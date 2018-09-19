import React from 'react';

import ClusterTopMenu from "app/components/cluster/TopMenu.js"
import ClusterDataPage from "app/components/cluster/ClusterDataPage.js"

export default ({cluster, match, actions}) => (
  <React.Fragment>

    <ClusterTopMenu
      clusterName={match.params.name}
      clusterSection="Access control list"
    />

    <ClusterDataPage
      clusterUrlId={match.params.name}
      cluster={cluster}
      activeMenu="acl"
    >
    </ClusterDataPage>

  </React.Fragment>
);