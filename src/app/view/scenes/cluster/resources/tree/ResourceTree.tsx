import React from "react";
import {
  DataList,
  Title,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
} from "@patternfly/react-core";
import { types } from "app/store";
import { PlusCircleIcon } from "@patternfly/react-icons";

import { ResourceTreeItemPrimitive } from "./ResourceTreeItemPrimitive";
import { ResourceTreeItemClone } from "./ResourceTreeItemClone";
import { ResourceTreeItemGroup } from "./ResourceTreeItemGroup";
import { SelectedResourceProvider } from "./SelectedResourceContext";

export const ResourceTree = ({
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
    return (
      <EmptyState style={{ margin: "auto" }}>
        <EmptyStateIcon icon={PlusCircleIcon} />
        <Title size="lg"> No resource is configured. </Title>
        <EmptyStateBody>
          You don&apos;t have any configured resources here.
        </EmptyStateBody>
      </EmptyState>
    );
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
