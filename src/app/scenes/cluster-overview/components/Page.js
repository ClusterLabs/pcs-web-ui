import React from 'react';

import ClusterDataPage from "app/components/cluster/ClusterDataPage.js"
import ClusterTopMenu from "app/components/cluster/TopMenu.js"

import ClusterOverview from "./ClusterOverview.js"

export default ({cluster, match, actions}) => (
  <React.Fragment>

    <ClusterTopMenu clusterName={match.params.name}/>

    <ClusterDataPage
      clusterUrlId={match.params.name}
      cluster={cluster}
      activeMenu="overview"
      actions={actions}
    >
      <ClusterOverview cluster={cluster.data}/>
    </ClusterDataPage>

  </React.Fragment>
);