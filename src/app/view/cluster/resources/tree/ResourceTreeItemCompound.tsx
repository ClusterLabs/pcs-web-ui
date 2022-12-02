import React from "react";
import {
  DataList,
  DataListContent,
  DataListItem,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

import {ResourceStatus} from "app/view/cluster/types";
import {useDispatch} from "app/view/share";
import {useClusterSources} from "app/view/share";

import {ResourceTreeItemCells} from "./ResourceTreeItemCells";

export const ResourceTreeItemCompound = ({
  resourceId,
  nestingDepth,
  status,
  type,
  children,
}: React.PropsWithChildren<{
  resourceId: string;
  nestingDepth: number;
  status: ResourceStatus;
  type: string;
}>) => {
  const dispatch = useDispatch();
  const {
    uiState: {resourceOpenedItems},
    loadedCluster: {clusterName},
  } = useClusterSources();
  const expanded = resourceOpenedItems.includes(resourceId);
  const label = `Members of resource item ${resourceId}`;
  return (
    <DataListItem
      aria-labelledby={`resource-tree-item-${resourceId}`}
      isExpanded={expanded}
    >
      <DataListItemRow data-test={`resource-tree-item ${resourceId}`}>
        <DataListToggle
          data-test="resource-tree-item-toggle"
          id={`resource-tree-toggle-${resourceId}`}
          isExpanded={expanded}
          onClick={() =>
            dispatch({
              type: "RESOURCE.TREE.ITEM.TOGGLE",
              key: {clusterName},
              payload: {itemId: resourceId},
            })
          }
        />
        <ResourceTreeItemCells
          resourceId={resourceId}
          status={status}
          type={type}
        />
      </DataListItemRow>
      {expanded && (
        <DataListContent aria-label={label} hasNoPadding>
          <DataList aria-label={label} data-level={nestingDepth}>
            {children}
          </DataList>
        </DataListContent>
      )}
    </DataListItem>
  );
};
