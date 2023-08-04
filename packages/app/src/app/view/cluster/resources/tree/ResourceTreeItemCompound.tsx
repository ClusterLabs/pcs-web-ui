import React from "react";
import {
  DataList,
  DataListContent,
  DataListItem,
  DataListItemRow,
} from "@patternfly/react-core";

import {useClusterSources} from "app/view/cluster/share";

import {ResourceTreeItemCells} from "./ResourceTreeItemCells";

export const ResourceTreeItemCompound = ({
  resourceId,
  idCell,
  typeCell,
  statusCell,
  toggle,
  nestingDepth,
  children,
}: React.PropsWithChildren<{
  resourceId: string;
  idCell: React.ReactNode;
  typeCell: React.ReactNode;
  statusCell: React.ReactNode;
  toggle: React.ReactNode;
  nestingDepth: number;
}>) => {
  const {
    uiState: {resourceOpenedItems},
  } = useClusterSources();
  const expanded = resourceOpenedItems.includes(resourceId);
  const label = `Members of resource item ${resourceId}`;
  return (
    <DataListItem
      aria-labelledby={`resource-tree-item-${resourceId}`}
      isExpanded={expanded}
    >
      <DataListItemRow data-test={`resource-tree-item ${resourceId}`}>
        {toggle}
        <ResourceTreeItemCells
          resourceId={resourceId}
          idCell={idCell}
          typeCell={typeCell}
          statusCell={statusCell}
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
