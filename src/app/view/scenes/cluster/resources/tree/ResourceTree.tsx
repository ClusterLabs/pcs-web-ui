import React from "react";
import {
  DataList,
  Title,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";

import { types } from "app/store";
import { useGroupDetailViewContext } from "app/view/common";


import { ResourceTreeItemPrimitive } from "./ResourceTreeItemPrimitive";
import { ResourceTreeItemClone } from "./ResourceTreeItemClone";
import { ResourceTreeItemGroup } from "./ResourceTreeItemGroup";

export const ResourceTree = ({ resourceTree }: {
  resourceTree: types.cluster.ResourceTreeItem[],
}) => {
  const { compact } = useGroupDetailViewContext();

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
      {resourceTree.map((resourceTreeItem) => {
        switch (resourceTreeItem.itemType) {
          case "primitive": return (
            <ResourceTreeItemPrimitive
              key={resourceTreeItem.id}
              primitive={resourceTreeItem}
            />
          );
          case "group": return (
            <ResourceTreeItemGroup
              key={resourceTreeItem.id}
              group={resourceTreeItem}
            />
          );
          case "clone": default: return (
            <ResourceTreeItemClone
              key={resourceTreeItem.id}
              clone={resourceTreeItem}
            />
          );
        }
      })}
    </DataList>
  );
};
