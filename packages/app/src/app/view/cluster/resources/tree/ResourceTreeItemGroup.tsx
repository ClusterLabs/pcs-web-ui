import {Group} from "app/view/cluster/types";

import {ResourceTreeItemPrimitive} from "./ResourceTreeItemPrimitive";
import {ResourceTreeItemCompound} from "./ResourceTreeItemCompound";
import {ResourceTreeItemCompoundToggle} from "./ResourceTreeItemCompoundToggle";
import {ResourceTreeItemFenceDevice} from "./ResourceTreeItemFenceDevice";
import {ResourceTreeCellName} from "./ResourceTreeCellName";
import {ResourceTreeCellType} from "./ResourceTreeCellType";
import {ResourceTreeCellStatus} from "./ResourceTreeCellStatus";

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
    toggle={<ResourceTreeItemCompoundToggle resourceId={group.id} />}
    idCell={<ResourceTreeCellName resourceId={group.id} />}
    typeCell={<ResourceTreeCellType type="Group" />}
    statusCell={<ResourceTreeCellStatus status={group.status} />}
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
