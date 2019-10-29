import React from "react";
import {
  DataList,
} from "@patternfly/react-core";
import { ResourceTreeItem } from "app/services/cluster/types";

import * as url from "app/common/urls";
import { NoItemCase } from "app/common/components";

import ResourceTreeItemPrimitive from "./ResourceTreeItemPrimitive";
import ResourceTreeItemClone from "./ResourceTreeItemClone";
import ResourceTreeItemGroup from "./ResourceTreeItemGroup";
import { SelectedResourceProvider } from "./SelectedResourceContext";

const ResourceTree = ({
  resourceTree,
  createResourceDetailUrl,
  compact = false,
  selectedResourceId = "",
}: {
  resourceTree: ResourceTreeItem[],
  createResourceDetailUrl: (id: string) => string,
  compact?: boolean,
  selectedResourceId?: string,
}) => {
  if (resourceTree.length === 0) {
    return <NoItemCase message="No resource is configured." />;
  }

  return (
    <DataList
      aria-label="Cluster resource list"
      className={`ha-c-tree-view${compact ? "" : " ha-m-full-width"}`}
    >
      <SelectedResourceProvider value={selectedResourceId}>
        {resourceTree.map((resourceTreeItem) => {
          switch (resourceTreeItem.itemType) {
            case "primitive": return (
              <ResourceTreeItemPrimitive
                key={resourceTreeItem.id}
                primitive={resourceTreeItem}
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
};

ResourceTree.createResourceDetailUrl = (
  (clusterUrlName: string) => (resourceUrlName: string) => url.resourcesDetail(
    clusterUrlName,
    resourceUrlName,
  )
);

export default ResourceTree;
