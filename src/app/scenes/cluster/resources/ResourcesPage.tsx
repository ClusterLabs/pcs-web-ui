import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@patternfly/react-core";

import {
  ClusterSectionToolbar,
  GroupDetailView,
  useSelectedClusterName,
} from "app/view";
import { selectors } from "app/store";

import { ResourceDetailPage } from "./ResourceDetailPage";
import { ResourceTree } from "./tree/ResourceTree";

export const ResourcesPage = ({ urlPrefix }: { urlPrefix: string }) => {
  const clusterStatus = useSelector(
    selectors.getCluster(useSelectedClusterName()),
  );
  return (
    <>
      <ClusterSectionToolbar>
        <Button>Add Resource</Button>
      </ClusterSectionToolbar>
      <GroupDetailView
        urlPrefix={urlPrefix}
        groupCard={<ResourceTree resourceTree={clusterStatus.resourceTree} />}
        detailCard={<ResourceDetailPage />}
      />
    </>
  );
};
