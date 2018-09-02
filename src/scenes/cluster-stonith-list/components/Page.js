import React from 'react';

import ClusterPageContent from "~/components/cluster/PageContent.js"
import ClusterTopMenu from "~/components/cluster/TopMenu.js"

import StonithList from "./StonithList.js"

export default ({cluster, match}) => (
  <React.Fragment>

    <ClusterTopMenu clusterName={cluster.name} clusterSection="Stonith"/>

    <ClusterPageContent
      clusterUrlId={match.params.name}
      clusterName={cluster.name}
      activeMenu="stonith"
    >
      <StonithList
        stonithList={cluster.stonithList}
      />
    </ClusterPageContent>

  </React.Fragment>
);
