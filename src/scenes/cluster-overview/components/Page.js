import React from 'react';

import ClusterPageContent from "~/components/cluster/PageContent.js"
import ClusterTopMenu from "~/components/cluster/TopMenu.js"

import ClusterOverview from "./ClusterOverview.js"

export default ({cluster, match}) => (
  <React.Fragment>

    <ClusterTopMenu clusterName={cluster.name}/>

    <ClusterPageContent
      clusterUrlId={match.params.name}
      clusterName={cluster.name}
      activeMenu="overview"
    >
      <ClusterOverview cluster={cluster}/>
    </ClusterPageContent>

  </React.Fragment>
);
