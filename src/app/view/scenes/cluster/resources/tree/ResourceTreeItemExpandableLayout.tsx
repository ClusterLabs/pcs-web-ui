import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DataListItem,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

import { types, selectors } from "app/store";
import { Action } from "app/actions";

import ResourceTreeNested from "./ResourceTreeNested";

const ResourceTreeItemExpandableLayout = ({
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
    <DataListItem aria-labelledby={resourceTreeItem.id} isExpanded={expanded}>
      <DataListItemRow>
        <DataListToggle
          id={`resource-tree-${resourceTreeItem.id}`}
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

export default ResourceTreeItemExpandableLayout;
