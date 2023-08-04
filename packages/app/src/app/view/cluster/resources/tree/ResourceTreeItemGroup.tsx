import {testMarks} from "app/view/dataTest";
import {Group} from "app/view/cluster/types";

import {ResourceTreeItemPrimitive} from "./ResourceTreeItemPrimitive";
import {ResourceTreeItemCompound} from "./ResourceTreeItemCompound";
import {ResourceTreeItemCompoundToggle} from "./ResourceTreeItemCompoundToggle";
import {ResourceTreeItemFenceDevice} from "./ResourceTreeItemFenceDevice";
import {ResourceTreeCellName} from "./ResourceTreeCellName";
import {ResourceTreeCellType} from "./ResourceTreeCellType";
import {ResourceTreeCellStatus} from "./ResourceTreeCellStatus";

const {group: groupMark} = testMarks.cluster.resources.tree;

export const ResourceTreeItemGroup = ({
  group,
  nestedLevel = 0,
}: {
  group: Group;
  nestedLevel?: number;
}) => (
  <ResourceTreeItemCompound
    resourceId={group.id}
    nestingDepth={1 + nestedLevel}
    toggle={
      <ResourceTreeItemCompoundToggle
        resourceId={group.id}
        {...groupMark.toggle.mark}
      />
    }
    idCell={
      <ResourceTreeCellName resourceId={group.id} {...groupMark.id.mark} />
    }
    typeCell={<ResourceTreeCellType type="Group" {...groupMark.type.mark} />}
    statusCell={
      <ResourceTreeCellStatus
        status={group.status}
        {...groupMark.status.mark}
      />
    }
    {...groupMark.mark}
  >
    {group.resources.map(resource =>
      resource.itemType === "fence-device" ? (
        <ResourceTreeItemFenceDevice key={resource.id} fenceDevice={resource} />
      ) : (
        <ResourceTreeItemPrimitive key={resource.id} primitive={resource} />
      ),
    )}
  </ResourceTreeItemCompound>
);
