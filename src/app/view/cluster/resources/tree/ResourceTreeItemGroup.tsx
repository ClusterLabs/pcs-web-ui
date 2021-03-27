import React from "react";

import { Group } from "app/view/cluster/types";

import { ResourceTreeItemPrimitive } from "./ResourceTreeItemPrimitive";
import { ResourceTreeItemCompound } from "./ResourceTreeItemCompound";

export const ResourceTreeItemGroup: React.FC<{
  group: Group;
  nestedLevel?: number;
}> = ({ group, nestedLevel = 0 }) => (
  <ResourceTreeItemCompound
    resourceId={group.id}
    nestingDepth={1 + nestedLevel}
    status={group.status}
    type="Group"
  >
    {group.resources.map(resource => (
      <ResourceTreeItemPrimitive key={resource.id} primitive={resource} />
    ))}
  </ResourceTreeItemCompound>
);
