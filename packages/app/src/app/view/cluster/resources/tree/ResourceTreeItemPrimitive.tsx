import {DataListItem, DataListItemRow} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {Primitive} from "app/view/cluster/types";

import {ResourceTreeItemCells} from "./ResourceTreeItemCells";
import {ResourceTreeCellName} from "./ResourceTreeCellName";
import {ResourceTreeCellType} from "./ResourceTreeCellType";
import {ResourceTreeCellStatus} from "./ResourceTreeCellStatus";

const {primitive: primitiveMark} = testMarks.cluster.resources.tree;

export const ResourceTreeItemPrimitive = ({
  primitive,
  nestingLevel,
}: {
  primitive: Primitive;
  nestingLevel: 0 | 1 | 2;
}) => (
  <DataListItem
    id={primitive.id}
    aria-labelledby={`resource-tree-item-${primitive.id}`}
    {...primitiveMark.mark}
  >
    <DataListItemRow>
      <ResourceTreeItemCells
        resourceId={primitive.id}
        nestingLevel={nestingLevel ?? 0}
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
