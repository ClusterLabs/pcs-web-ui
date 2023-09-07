import {testMarks} from "app/view/dataTest";
import {Clone} from "app/view/cluster/types";

import {ResourceTreeItemPrimitive} from "./ResourceTreeItemPrimitive";
import {ResourceTreeItemGroup} from "./ResourceTreeItemGroup";
import {ResourceTreeItemCompound} from "./ResourceTreeItemCompound";
import {ResourceTreeItemCompoundToggle} from "./ResourceTreeItemCompoundToggle";
import {ResourceTreeItemFenceDevice} from "./ResourceTreeItemFenceDevice";
import {ResourceTreeCellName} from "./ResourceTreeCellName";
import {ResourceTreeCellType} from "./ResourceTreeCellType";
import {ResourceTreeCellStatus} from "./ResourceTreeCellStatus";

const {clone: cloneMark} = testMarks.cluster.resources.tree;

export const ResourceTreeItemClone = ({clone}: {clone: Clone}) => {
  return (
    <ResourceTreeItemCompound
      resourceId={clone.id}
      nestingDepth={1}
      toggle={
        <ResourceTreeItemCompoundToggle
          resourceId={clone.id}
          {...cloneMark.toggle.mark}
        />
      }
      idCell={
        <ResourceTreeCellName resourceId={clone.id} {...cloneMark.id.mark} />
      }
      typeCell={<ResourceTreeCellType type="Clone" {...cloneMark.type.mark} />}
      statusCell={
        <ResourceTreeCellStatus
          status={clone.status}
          {...cloneMark.status.mark}
        />
      }
      {...cloneMark.mark}
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
