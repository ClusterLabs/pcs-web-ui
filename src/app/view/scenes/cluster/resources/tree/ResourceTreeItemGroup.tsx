import React from "react";
import { types } from "app/store";

import { ResourceTreeItemPrimitive } from "./ResourceTreeItemPrimitive";
import { ResourceTreeItemCompound } from "./ResourceTreeItemCompound";

export const ResourceTreeItemGroup = ({ group, nestedLevel = 0 }: {
  group: types.cluster.Group,
  nestedLevel?: number,
}) => (
  <ResourceTreeItemCompound
    resourceId={group.id}
    nestingDepth={1 + nestedLevel}
    statusList={[{ label: group.status, severity: group.statusSeverity }]}
    type="Group"
  >
    {group.resources.map((resource) => (
      <ResourceTreeItemPrimitive key={resource.id} primitive={resource} />
    ))}
  </ResourceTreeItemCompound>
);
