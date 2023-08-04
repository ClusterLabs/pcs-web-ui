import {
  DataListItem,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {Primitive} from "app/view/cluster/types";

import {ResourceTreeItemCells} from "./ResourceTreeItemCells";
import {ResourceTreeCellName} from "./ResourceTreeCellName";
import {ResourceTreeCellType} from "./ResourceTreeCellType";
import {ResourceTreeCellStatus} from "./ResourceTreeCellStatus";

const {primitive: primitiveMark} = testMarks.cluster.resources.tree;

export const ResourceTreeItemPrimitive = ({
  primitive,
}: {
  primitive: Primitive;
}) => {
  return (
    <DataListItem
      aria-labelledby={`resource-tree-item-${primitive.id}`}
      {...primitiveMark.mark}
    >
      <DataListItemRow>
        <DataListToggle
          aria-label="Resource toggle"
          id={`resource-tree-toggle-${primitive.id}`}
          aria-hidden="true"
        />
        <ResourceTreeItemCells
          resourceId={primitive.id}
          idCell={
            <ResourceTreeCellName
              resourceId={primitive.id}
              {...primitiveMark.id.mark}
            />
          }
          typeCell={
            <ResourceTreeCellType
              type={primitive.type}
              typeDescription={`${primitive.class}${
                primitive.provider ? ":" + primitive.provider : ""
              }`}
              {...primitiveMark.type.mark}
            />
          }
          statusCell={
            <ResourceTreeCellStatus
              status={primitive.status}
              {...primitiveMark.status.mark}
            />
          }
        />
      </DataListItemRow>
    </DataListItem>
  );
};
