import React from "react";
import { useRouteMatch } from "react-router";

import { types } from "app/store";
import { ResourceTreePage } from "./tree";
import ResourceDetailPage from "./ResourceDetailPage";


const ClusterDetailResources = ({ cluster, urlPrefix }:{
  cluster: types.cluster.ClusterState;
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
