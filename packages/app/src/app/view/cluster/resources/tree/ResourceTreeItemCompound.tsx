import React from "react";
import {
  DataList,
  DataListContent,
  DataListItem,
  DataListItemRow,
} from "@patternfly/react-core";

import {useClusterSources} from "app/view/cluster/share";

import {ResourceTreeItemCells} from "./ResourceTreeItemCells";

export const ResourceTreeItemCompound = (
  props: React.PropsWithChildren<{
    resourceId: string;
    idCell: React.ReactNode;
    typeCell: React.ReactNode;
    statusCell: React.ReactNode;
    toggle: React.ReactNode;
    nestingDepth: number;
    "data-test"?: string;
  }>,
) => {
  const {
    uiState: {resourceOpenedItems},
  } = useClusterSources();
  const expanded = resourceOpenedItems.includes(props.resourceId);
  const label = `Members of resource item ${props.resourceId}`;
  return (
    <DataListItem
      aria-labelledby={`resource-tree-item-${props.resourceId}`}
      isExpanded={expanded}
      data-test={props["data-test"]}
    >
      <DataListItemRow>
        {props.toggle}
        <ResourceTreeItemCells
          resourceId={props.resourceId}
          idCell={props.idCell}
          typeCell={props.typeCell}
          statusCell={props.statusCell}
        />
      </DataListItemRow>
      {expanded && (
        <DataListContent aria-label={label} hasNoPadding>
          <DataList
            aria-label={label}
            data-level={props.nestingDepth}
            gridBreakpoint="lg"
          >
            {props.children}
          </DataList>
        </DataListContent>
      )}
    </DataListItem>
  );
};
