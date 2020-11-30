import React from "react";
import { ActionList, ActionListItem } from "@patternfly/react-core";

import {
  ClusterSectionToolbar,
  GroupDetailView,
  useClusterSelector,
} from "app/view";
import { selectors } from "app/store";

import { ResourceDetailPage } from "./ResourceDetailPage";
import { ResourceTree } from "./tree/ResourceTree";
import { ResourceCreateToolbarItem, ResourceGroupToolbarItem } from "./wizard";

export const ResourcesPage = ({ urlPrefix }: { urlPrefix: string }) => {
  const [cluster] = useClusterSelector(selectors.getCluster);
  return (
    <>
      <ClusterSectionToolbar>
        <ActionList>
          <ActionListItem>
            <ResourceCreateToolbarItem />
          </ActionListItem>
          <ActionListItem>
            <ResourceGroupToolbarItem variant="secondary" />
          </ActionListItem>
        </ActionList>
      </ClusterSectionToolbar>
      <GroupDetailView
        urlPrefix={urlPrefix}
        groupCard={<ResourceTree resourceTree={cluster.resourceTree} />}
        detailCard={<ResourceDetailPage />}
      />
    </>
  );
};
