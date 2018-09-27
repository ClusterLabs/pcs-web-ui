import React from "react";

import ClusterTopMenu from "app/components/cluster/TopMenu";
import ClusterDataPage from "app/components/cluster/ClusterDataPage";

export default ({ cluster, match }) => (
  <React.Fragment>

    <ClusterTopMenu
      clusterName={match.params.name}
      clusterSection="Access control list"
    />

    <ClusterDataPage
      clusterUrlId={match.params.name}
      cluster={cluster}
      activeMenu="acl"
    />

  </React.Fragment>
);
