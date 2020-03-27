import React from "react";
import {
  DataListItemCells,
  DataListCell,
} from "@patternfly/react-core";

import { types } from "app/store";

import { ResourceTreeCellName } from "./ResourceTreeCellName";
import { ResourceTreeCellType } from "./ResourceTreeCellType";
import { ResourceTreeCellStatus } from "./ResourceTreeCellStatus";
import { ResourceTreeCellSelection } from "./ResourceTreeCellSelection";

export const ResourceTreeItemCells = ({
  resourceId,
  status,
  type,
  typeDescription = "",
}: {
  resourceId: string;
  status: types.cluster.ResourceStatus;
  type: string,
  typeDescription?: string,
}) => {
  return (
    <>
      <DataListItemCells
        dataListCells={[
          <DataListCell aria-label="Resource name">
            <ResourceTreeCellName
              key={resourceId}
              resourceId={resourceId}
            />
          </DataListCell>,
          <DataListCell>
            <ResourceTreeCellType
              key={`${resourceId}.type`}
              type={type}
              typeDescription={typeDescription}
            />
          </DataListCell>,
        ]}
      />
      <ResourceTreeCellStatus status={status} />
      <ResourceTreeCellSelection resourceId={resourceId} />
    </>
  );
};
