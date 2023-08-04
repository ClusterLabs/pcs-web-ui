import {Clone} from "app/view/cluster/types";

import {ResourceTreeItemPrimitive} from "./ResourceTreeItemPrimitive";
import {ResourceTreeItemGroup} from "./ResourceTreeItemGroup";
import {ResourceTreeItemCompound} from "./ResourceTreeItemCompound";
import {ResourceTreeItemCompoundToggle} from "./ResourceTreeItemCompoundToggle";
import {ResourceTreeItemFenceDevice} from "./ResourceTreeItemFenceDevice";
import {ResourceTreeCellName} from "./ResourceTreeCellName";
import {ResourceTreeCellType} from "./ResourceTreeCellType";
import {ResourceTreeCellStatus} from "./ResourceTreeCellStatus";

export const ResourceTreeItemClone = ({clone}: {clone: Clone}) => {
  return (
    <ResourceTreeItemCompound
      resourceId={clone.id}
      nestingDepth={1}
      toggle={<ResourceTreeItemCompoundToggle resourceId={clone.id} />}
      idCell={<ResourceTreeCellName resourceId={clone.id} />}
      typeCell={<ResourceTreeCellType type="Clone" />}
      statusCell={<ResourceTreeCellStatus status={clone.status} />}
    >
      {clone.member.itemType === "primitive" && (
        <ResourceTreeItemPrimitive primitive={clone.member} />
      )}
      {clone.member.itemType === "group" && (
        <ResourceTreeItemGroup group={clone.member} nestedLevel={1} />
      )}
      {clone.member.itemType === "fence-device" && (
        <ResourceTreeItemFenceDevice
          key={clone.member.id}
          fenceDevice={clone.member}
        />
      )}
    </ResourceTreeItemCompound>
  );
};
