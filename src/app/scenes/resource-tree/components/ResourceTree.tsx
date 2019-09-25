import React from "react";
import {
  DataList,
} from "@patternfly/react-core";
import { ResourceTreeItem } from "app/services/cluster/types";

import * as url from "app/common/urls";

import { SelectedResourceProvider } from "./SelectedResourceContext";
import ResourceTreeItemPrimitive from "./ResourceTreeItemPrimitive";
import ResourceTreeItemClone from "./ResourceTreeItemClone";
import ResourceTreeItemGroup from "./ResourceTreeItemGroup";

const ClusterResourceTree = ({
  resourceTree,
  createResourceDetailUrl,
  compact = false,
  selectedResource = "",
}: {
  resourceTree: ResourceTreeItem[],
  createResourceDetailUrl: (id: string) => string,
  compact?: boolean,
  selectedResource?: string,
}) => (
  <DataList
    aria-label="Cluster resource list"
    className={`ha-c-tree-view${compact ? "" : " ha-m-full-width"}`}
  >
    <SelectedResourceProvider value={selectedResource}>
      {resourceTree.map((resourceTreeItem) => {
        switch (resourceTreeItem.itemType) {
          case "resource": return (
            <ResourceTreeItemPrimitive
              key={resourceTreeItem.id}
              resource={resourceTreeItem}
              createResourceDetailUrl={createResourceDetailUrl}
            />
          );
          case "group": return (
            <ResourceTreeItemGroup
              key={resourceTreeItem.id}
              group={resourceTreeItem}
              createResourceDetailUrl={createResourceDetailUrl}
            />
          );
          case "clone": default: return (
            <ResourceTreeItemClone
              key={resourceTreeItem.id}
              clone={resourceTreeItem}
              createResourceDetailUrl={createResourceDetailUrl}
            />
          );
        }
      })}
    </SelectedResourceProvider>
  </DataList>
);

ClusterResourceTree.createResourceDetailUrl = (
  (clusterUrlName: string) => (resourceUrlName: string) => url.resourcesDetail(
    clusterUrlName,
    resourceUrlName,
  )
);

export default ClusterResourceTree;
