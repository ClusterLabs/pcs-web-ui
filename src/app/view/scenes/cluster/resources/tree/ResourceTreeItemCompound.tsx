import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DataList,
  DataListContent,
  DataListItem,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

import { selectors, types } from "app/store";
import { Action } from "app/actions";

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
  const expanded = useSelector(selectors.resourceTreeGetOpenedItems).includes(
    resourceId,
  );
  const label = `Members of resource item ${resourceId}`;
  return (
    <DataListItem
      aria-labelledby={`resource-tree-item-${resourceId}`}
      isExpanded={expanded}
    >
      <DataListItemRow aria-label={`Resource item ${resourceId}`}>
        <DataListToggle
          aria-label="Resource toggle"
          id={`resource-tree-toggle-${resourceId}`}
          isExpanded={expanded}
          onClick={() =>
            dispatch<Action>({
              type: "RESOURCE_TREE.ITEM.TOGGLE",
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
        <DataListContent aria-label={label} noPadding>
          <DataList aria-label={label} data-level={nestingDepth}>
            {children}
          </DataList>
        </DataListContent>
      )}
    </DataListItem>
  );
};
