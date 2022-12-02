import {DataList} from "@patternfly/react-core";

import {Resource} from "app/view/cluster/types";
import {
  EmptyStateClusterStopped,
  EmptyStateNoItem,
  useGroupDetailViewContext,
  useLoadedCluster,
} from "app/view/share";

import {ResourceTreeItemPrimitive} from "./ResourceTreeItemPrimitive";
import {ResourceTreeItemClone} from "./ResourceTreeItemClone";
import {ResourceTreeItemGroup} from "./ResourceTreeItemGroup";

export const ResourceTree = ({resourceTree}: {resourceTree: Resource[]}) => {
  const {compact} = useGroupDetailViewContext();
  const {hasCibInfo, clusterName} = useLoadedCluster();

  if (!hasCibInfo) {
    return (
      <EmptyStateClusterStopped
        title={"Cannot get resources from stopped cluster"}
        clusterName={clusterName}
      />
    );
  }

  if (resourceTree.length === 0) {
    return (
      <EmptyStateNoItem
        title="No resource is configured."
        message="You don't have any configured resources here."
      />
    );
  }

  return (
    <DataList
      data-test="cluster-resources"
      aria-label="Cluster resources"
      className={`ha-c-tree-view${compact ? "" : " ha-m-full-width"}`}
    >
      {resourceTree.map(resourceTreeItem => {
        switch (resourceTreeItem.itemType) {
          case "primitive":
            return (
              <ResourceTreeItemPrimitive
                key={resourceTreeItem.id}
                primitive={resourceTreeItem}
              />
            );

          case "group":
            return (
              <ResourceTreeItemGroup
                key={resourceTreeItem.id}
                group={resourceTreeItem}
              />
            );

          case "clone":
          default:
            return (
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
