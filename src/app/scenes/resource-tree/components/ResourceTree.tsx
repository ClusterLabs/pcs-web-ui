import React from "react";
import {
  DataList,
} from "@patternfly/react-core";
import { types } from "app/store";

import { NoItemCase } from "app/view/common";

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
  resourceTree: types.cluster.ResourceTreeItem[],
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
  (clusterUrlName: string) => (resourceUrlName: string) => (
    `/cluster/${clusterUrlName}/resources/${resourceUrlName}`
  )
);

export default ResourceTree;
