import React from "react";

import { GroupDetailView, useClusterSelector } from "app/view";
import { selectors } from "app/store";

import { ResourceDetailPage } from "./ResourceDetailPage";
import { ResourceTree } from "./tree/ResourceTree";
import { ResourcesToolbar } from "./ResourcesToolbar";

export const ResourcesPage = ({ urlPrefix }: { urlPrefix: string }) => {
  const [clusterStatus] = useClusterSelector(selectors.getCluster);
  return (
    <>
      <ResourcesToolbar />
      <GroupDetailView
        urlPrefix={urlPrefix}
        groupCard={<ResourceTree resourceTree={clusterStatus.resourceTree} />}
        detailCard={<ResourceDetailPage />}
      />
    </>
  );
};
