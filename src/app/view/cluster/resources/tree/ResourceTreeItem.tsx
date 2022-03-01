import {
  DataListItem,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

import { ResourceStatus } from "app/view/cluster/types";

import { ResourceTreeItemCells } from "./ResourceTreeItemCells";

export const ResourceTreeItem = ({
  resourceId,
  status,
  type,
  typeDescription,
}: {
  resourceId: string;
  status: ResourceStatus;
  type: string;
  typeDescription: string;
}) => {
  return (
    <DataListItem aria-labelledby={`resource-tree-item-${resourceId}`}>
      <DataListItemRow data-test={`resource-tree-item ${resourceId}`}>
        <DataListToggle
          aria-label="Resource toggle"
          id={`resource-tree-toggle-${resourceId}`}
          aria-hidden="true"
        />
        <ResourceTreeItemCells
          resourceId={resourceId}
          status={status}
          type={type}
          typeDescription={typeDescription}
        />
      </DataListItemRow>
    </DataListItem>
  );
};
