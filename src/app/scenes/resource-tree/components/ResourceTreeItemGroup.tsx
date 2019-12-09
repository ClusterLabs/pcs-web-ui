import React from "react";
import { types } from "app/store";

import ResourceTreeItemPrimitive from "./ResourceTreeItemPrimitive";
import ResourceTreeItemExpandableLayout
  from "./ResourceTreeItemExpandableLayout";

const ResourceTreeItemGroup = (
  { group, createResourceDetailUrl, nestedLevel = 0 }: {
    group: types.cluster.Group,
    createResourceDetailUrl: (id: string) => string,
    nestedLevel?: number,
  },
) => (
  <ResourceTreeItemExpandableLayout
    resourceTreeItem={group}
    resourceDetailUrl={createResourceDetailUrl(group.id)}
    nestedAriaLabel={`Group ${group.id}: resources`}
    nestingDepth={1 + nestedLevel}
  >
    {group.resources.map(resource => (
      <ResourceTreeItemPrimitive
        key={resource.id}
        primitive={resource}
        createResourceDetailUrl={createResourceDetailUrl}
      />
    ))}
  </ResourceTreeItemExpandableLayout>
);

export default ResourceTreeItemGroup;
