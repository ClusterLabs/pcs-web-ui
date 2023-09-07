import {Group} from "app/view/cluster/types";

import {ResourceTreeItemPrimitive} from "./ResourceTreeItemPrimitive";
import {ResourceTreeItemCompound} from "./ResourceTreeItemCompound";
import {ResourceTreeItemFenceDevice} from "./ResourceTreeItemFenceDevice";

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
    status={group.status}
    type="Group"
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
