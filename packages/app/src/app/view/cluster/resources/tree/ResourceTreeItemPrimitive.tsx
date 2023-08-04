import {
  DataListItem,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

import {Primitive} from "app/view/cluster/types";

import {ResourceTreeItemCells} from "./ResourceTreeItemCells";
import {ResourceTreeCellName} from "./ResourceTreeCellName";
import {ResourceTreeCellType} from "./ResourceTreeCellType";
import {ResourceTreeCellStatus} from "./ResourceTreeCellStatus";

export const ResourceTreeItemPrimitive = ({
  primitive,
}: {
  primitive: Primitive;
}) => {
  return (
    <DataListItem aria-labelledby={`resource-tree-item-${primitive.id}`}>
      <DataListItemRow data-test={`resource-tree-item ${primitive.id}`}>
        <DataListToggle
          aria-label="Resource toggle"
          id={`resource-tree-toggle-${primitive.id}`}
          aria-hidden="true"
        />
        <ResourceTreeItemCells
          resourceId={primitive.id}
          idCell={<ResourceTreeCellName resourceId={primitive.id} />}
          typeCell={
            <ResourceTreeCellType
              type={primitive.type}
              typeDescription={`${primitive.class}${
                primitive.provider ? ":" + primitive.provider : ""
              }`}
            />
          }
          statusCell={<ResourceTreeCellStatus status={primitive.status} />}
        />
      </DataListItemRow>
    </DataListItem>
  );
};
