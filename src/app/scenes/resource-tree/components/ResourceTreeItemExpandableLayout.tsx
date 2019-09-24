import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DataListItem,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

import * as selectors from "../selectors";
import * as ResourceTreeAction from "../actions";
import ResourceTreeItemDescription from "./ResourceTreeItemDescription";
import ResourceTreeNested from "./ResourceTreeNested";

const ResourceTreeItemExpandableLayout = ({
  resourceId,
  resourceDetailUrl,
  nestedAriaLabel,
  nestingDepth,
  children,
}: React.PropsWithChildren<{
  resourceId: string,
  resourceDetailUrl: string,
  nestingDepth: number,
  nestedAriaLabel: string,
}>) => {
  const dispatch = useDispatch();
  const expanded = useSelector(selectors.getOpenedItems).includes(resourceId);
  return (
    <DataListItem aria-labelledby={resourceId} isExpanded={expanded}>
      <DataListItemRow>
        <DataListToggle
          id={`resource-tree-${resourceId}`}
          isExpanded={expanded}
          onClick={
            () => dispatch<ResourceTreeAction.ToggleItem>({
              type: "RESOURCE_TREE.ITEM.TOGGLE",
              payload: { itemId: resourceId },
            })
          }
        />
        <ResourceTreeItemDescription
          itemId={resourceId}
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
