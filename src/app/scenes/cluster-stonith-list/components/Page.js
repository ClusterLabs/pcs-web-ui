import React from 'react';

import ClusterDataPage from "app/components/cluster/ClusterDataPage.js"
import ClusterTopMenu from "app/components/cluster/TopMenu.js"

import StonithList from "./StonithList.js"

export default ({cluster, match, actions}) => (
  <React.Fragment>

    <ClusterTopMenu clusterName={match.params.name} clusterSection="Stonith"/>

    <ClusterDataPage
      clusterUrlId={match.params.name}
      cluster={cluster}
      activeMenu="stonith"
      actions={actions}
    >
      <StonithList
        stonithList={cluster.data.stonithList}
      />
    </ClusterDataPage>

  </React.Fragment>
);
