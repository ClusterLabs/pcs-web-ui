import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DataListItem,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

import { ResourceTreeItem } from "app/services/cluster/types";
import { Action } from "app/actions";

import * as selectors from "../selectors";
import ResourceTreeItemDescription from "./ResourceTreeItemDescription";
import ResourceTreeNested from "./ResourceTreeNested";

const ResourceTreeItemExpandableLayout = ({
  resourceTreeItem,
  resourceDetailUrl,
  nestedAriaLabel,
  nestingDepth,
  children,
}: React.PropsWithChildren<{
  resourceTreeItem: ResourceTreeItem,
  resourceDetailUrl: string,
  nestingDepth: number,
  nestedAriaLabel: string,
}>) => {
  const dispatch = useDispatch();
  const expanded = useSelector(selectors.getOpenedItems).includes(
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
        <ResourceTreeItemDescription
          resourceTreeItem={resourceTreeItem}
          detailUrl={resourceDetailUrl}
          type="Clone"
        />
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
