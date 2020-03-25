import React from "react";
import {
  DataListItem,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

import { types } from "app/store";

import { ResourceTreeItemCells } from "./ResourceTreeItemCells";

export const ResourceTreeItem = ({
  resourceId,
  statusList,
  type,
  typeDescription,
}: {
  resourceId: string;
  statusList: types.cluster.ResourceStatusInfo[];
  type: string,
  typeDescription: string,
}) => {
  return (
    <DataListItem aria-labelledby={`resource-tree-item-${resourceId}`}>
      <DataListItemRow aria-label={`Resource item ${resourceId}`}>
        <DataListToggle
          aria-label="Resource toggle"
          id={`resource-tree-toggle-${resourceId}`}
          aria-hidden="true"
        />
        <ResourceTreeItemCells
          resourceId={resourceId}
          statusList={statusList}
          type={type}
          typeDescription={typeDescription}
        />
      </DataListItemRow>
    </DataListItem>
  );
};
