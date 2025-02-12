import {DataList} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {EmptyStateClusterStopped, EmptyStateNoItem} from "app/view/share";
import {
  useGroupDetailViewContext,
  useLoadedCluster,
} from "app/view/cluster/share";

import {ResourceTreeItemPrimitive} from "./ResourceTreeItemPrimitive";
import {ResourceTreeItemClone} from "./ResourceTreeItemClone";
import {ResourceTreeItemGroup} from "./ResourceTreeItemGroup";
import type {FilteredTree} from "./filter";

const {empty, tree, stopped} = testMarks.cluster.resources;

export const ResourceTree = ({resourceTree}: {resourceTree: FilteredTree}) => {
  const {compact, selectedItemUrlName} = useGroupDetailViewContext();
  const {hasCibInfo, clusterName} = useLoadedCluster();

  if (!hasCibInfo) {
    return (
      <EmptyStateClusterStopped
        title={"Cannot get resources from stopped cluster"}
        clusterName={clusterName}
        {...stopped.mark}
      />
    );
  }

  if (resourceTree.length === 0) {
    return (
      <EmptyStateNoItem
        title="No resource is configured."
        message="You don't have any configured resources here."
        {...empty.mark}
      />
    );
  }

  return (
    <DataList
      aria-label="Cluster resources"
      className={`ha-c-tree-view${compact ? "" : " ha-m-full-width"}`}
      {...tree.mark}
      gridBreakpoint="lg"
      selectedDataListItemId={selectedItemUrlName}
    >
      {resourceTree.map(resourceTreeItem => {
        switch (resourceTreeItem.itemType) {
          case "primitive":
            return (
              <ResourceTreeItemPrimitive
                key={resourceTreeItem.id}
                primitive={resourceTreeItem}
                nestingLevel={0}
              />
            );

          case "group":
            return (
              <ResourceTreeItemGroup
                key={resourceTreeItem.id}
                group={resourceTreeItem}
                nestingLevel={0}
              />
            );
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
