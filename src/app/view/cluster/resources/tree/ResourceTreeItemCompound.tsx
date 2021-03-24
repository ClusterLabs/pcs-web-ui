import React from "react";
import {
  DataList,
  DataListContent,
  DataListItem,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

import { selectors, types } from "app/store";
import { useClusterSelector, useDispatch } from "app/view/share";

import { ResourceTreeItemCells } from "./ResourceTreeItemCells";

export const ResourceTreeItemCompound = ({
  resourceId,
  nestingDepth,
  status,
  type,
  children,
}: React.PropsWithChildren<{
  resourceId: string;
  nestingDepth: number;
  status: types.cluster.ResourceStatus;
  type: string;
}>) => {
  const dispatch = useDispatch();
  const [opened, cluster] = useClusterSelector(
    selectors.resourceTreeGetOpenedItems,
  );
  const expanded = opened.includes(resourceId);
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
              key: { clusterName: cluster },
              payload: { itemId: resourceId },
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
