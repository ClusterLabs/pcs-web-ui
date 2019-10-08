import React from "react";
import { useRouteMatch } from "react-router";

import { ClusterState } from "app/services/cluster/types";
import { ResourceDetailPage } from "app/scenes/resource-detail";
import { ResourceTreePage } from "app/scenes/resource-tree";


const ClusterDetailResources = ({ cluster, urlPrefix }:{
  cluster: ClusterState;
  urlPrefix: string;
}) => {
  const detail = useRouteMatch<{resourceUrlName: string}>(
    `${urlPrefix}/:resourceUrlName/`,
  );

  if (detail) {
    return (
      <ResourceDetailPage
        resourceUrlName={detail.params.resourceUrlName}
        urlPrefix={detail.url}
        closeUrl={`${urlPrefix}/`}
      />
    );
  }

  return <ResourceTreePage />;
};

export default ClusterDetailResources;
