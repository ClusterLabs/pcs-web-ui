import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataListToggle } from "@patternfly/react-core";

import * as selectors from "../selectors";
import * as ResourceTreeAction from "../actions";

const useExpansionState = (resourceId: string) => {
  const dispatch = useDispatch();
  const expanded = useSelector(selectors.getOpenedItems).includes(resourceId);
  const toggle = () => dispatch<ResourceTreeAction.ToggleItem>({
    type: "RESOURCE_TREE.ITEM.TOGGLE",
    payload: { itemId: resourceId },
  });
  return expanded;
};

const ResourceTreeToggler = ({ resourceId, expanded }: {
  resourceId: string,
  expanded: boolean,
}) => {
  const dispatch = useDispatch();
  return (
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
  );
};

ResourceTreeToggler.useExpansionState = useExpansionState;

export default ResourceTreeToggler;
