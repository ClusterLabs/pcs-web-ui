import React from "react";
import {
  DataList,
  Title,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";

import { GroupComponentProps } from "app/view/common/clusterGroupDetail";

import { ResourceTreeItemPrimitive } from "./ResourceTreeItemPrimitive";
import { ResourceTreeItemClone } from "./ResourceTreeItemClone";
import { ResourceTreeItemGroup } from "./ResourceTreeItemGroup";
import { ResourceTreeContextProvider } from "./ResourceTreeContext";

export const ResourceTree = ({
  cluster,
  detailUrlName = "",
}: GroupComponentProps) => {
  if (cluster.resourceTree.length === 0) {
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

  const compact = detailUrlName !== "";

  return (
    <DataList
      aria-label="Cluster resource list"
      className={`ha-c-tree-view${compact ? "" : " ha-m-full-width"}`}
    >
      <ResourceTreeContextProvider
        value={{
          selectedResourceId: detailUrlName,
          clusterUrlName: cluster.urlName,
          compact,
        }}
      >
        {cluster.resourceTree.map((resourceTreeItem) => {
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
      </ResourceTreeContextProvider>
    </DataList>
  );
};
