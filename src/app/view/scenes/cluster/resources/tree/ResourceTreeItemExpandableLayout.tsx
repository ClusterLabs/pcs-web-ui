import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DataListItem,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

import { types, selectors } from "app/store";
import { Action } from "app/actions";

import { ResourceTreeNested } from "./ResourceTreeNested";

export const ResourceTreeItemExpandableLayout = ({
  resourceTreeItem,
  nestedAriaLabel,
  nestingDepth,
  itemDescription,
  children,
}: React.PropsWithChildren<{
  resourceTreeItem: types.cluster.ResourceTreeItem,
  nestingDepth: number,
  nestedAriaLabel: string,
  itemDescription: JSX.Element;
}>) => {
  const dispatch = useDispatch();
  const expanded = useSelector(selectors.resourceTreeGetOpenedItems).includes(
    resourceTreeItem.id,
  );
  return (
    <DataListItem
      aria-labelledby={`resource-tree-item-${resourceTreeItem.id}`}
      isExpanded={expanded}
    >
      <DataListItemRow aria-label={`Resource item ${resourceTreeItem.id}`}>
        <DataListToggle
          aria-label="Resource toggle"
          id={`resource-tree-toggle-${resourceTreeItem.id}`}
          isExpanded={expanded}
          onClick={
            () => dispatch<Action>({
              type: "RESOURCE_TREE.ITEM.TOGGLE",
              payload: { itemId: resourceTreeItem.id },
            })
          }
        />
        {itemDescription}
      </DataListItemRow>
      {expanded && (
        <ResourceTreeNested
          ariaLabel={nestedAriaLabel}
          nestingDepth={nestingDepth}
        >
          {children}
        </ResourceTreeNested>
      )}
    </DataListItem>
  );
};
