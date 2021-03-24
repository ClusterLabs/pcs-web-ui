import React from "react";
import { DataListCell, DataListItemCells } from "@patternfly/react-core";

import { types } from "app/store";
import {
  SelectionIndicatorInGroup,
  useGroupDetailViewContext,
} from "app/view/share";

import { ResourceTreeCellName } from "./ResourceTreeCellName";
import { ResourceTreeCellType } from "./ResourceTreeCellType";
import { ResourceTreeCellStatus } from "./ResourceTreeCellStatus";

export const ResourceTreeItemCells: React.FC<{
  resourceId: string;
  status: types.cluster.ResourceStatus;
  type: string;
  typeDescription?: string;
}> = ({ resourceId, status, type, typeDescription = "" }) => {
  const { selectedItemUrlName } = useGroupDetailViewContext();
  return (
    <>
      <DataListItemCells
        dataListCells={[
          <DataListCell key={resourceId}>
            <ResourceTreeCellName resourceId={resourceId} />
          </DataListCell>,
          <DataListCell key={`${resourceId}.type`}>
            <ResourceTreeCellType
              type={type}
              typeDescription={typeDescription}
            />
          </DataListCell>,
        ]}
      />
      <ResourceTreeCellStatus status={status} />
      {selectedItemUrlName !== "" && (
        <SelectionIndicatorInGroup
          isSelected={resourceId === selectedItemUrlName}
        />
      )}
    </>
  );
};
