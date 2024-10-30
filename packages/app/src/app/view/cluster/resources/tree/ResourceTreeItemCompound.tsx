import React from "react";
import {
  DataList,
  DataListContent,
  DataListItem,
  DataListItemRow,
} from "@patternfly/react-core";

import {useGroupDetailViewContext} from "app/view/cluster/share";

import {ResourceTreeItemCells} from "./ResourceTreeItemCells";

export const ResourceTreeItemCompound = (
  props: React.PropsWithChildren<{
    resourceId: string;
    idCell: React.ReactNode;
    typeCell: React.ReactNode;
    statusCell: React.ReactNode;
    nestingLevel: 0 | 1;
    "data-test"?: string;
  }>,
) => {
  const {selectedItemUrlName} = useGroupDetailViewContext();
  const label = `Members of resource item ${props.resourceId}`;
  return (
    <DataListItem
      id={props.resourceId}
      aria-labelledby={`resource-tree-item-${props.resourceId}`}
      isExpanded={true}
      data-test={props["data-test"]}
    >
      <DataListItemRow>
        <ResourceTreeItemCells
          idCell={props.idCell}
          typeCell={props.typeCell}
          statusCell={props.statusCell}
          nestingLevel={props.nestingLevel}
        />
      </DataListItemRow>
      <DataListContent aria-label={label} hasNoPadding>
        <DataList
          aria-label={label}
          data-level={props.nestingLevel}
          gridBreakpoint="lg"
          selectedDataListItemId={selectedItemUrlName}
        >
          {props.children}
        </DataList>
      </DataListContent>
    </DataListItem>
  );
};
