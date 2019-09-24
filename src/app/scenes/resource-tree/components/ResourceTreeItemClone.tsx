import React from "react";

import { Clone } from "app/services/cluster/types";

import ResourceTreeItemPrimitive from "./ResourceTreeItemPrimitive";
import ResourceTreeItemGroup from "./ResourceTreeItemGroup";
import ResourceTreeItemExpandableLayout
  from "./ResourceTreeItemExpandableLayout";


const ResourceTreeItemClone = ({ clone, createResourceDetailUrl }: {
  clone: Clone,
  createResourceDetailUrl: (id: string) => string,
}) => (
  <ResourceTreeItemExpandableLayout
    resourceId={clone.id}
    resourceDetailUrl={createResourceDetailUrl(clone.id)}
    nestedAriaLabel={`Clone ${clone.id}: member`}
    nestingDepth={1}
  >
    {clone.member.itemType === "resource" && (
      <ResourceTreeItemPrimitive
        key={clone.member.id}
        resource={clone.member}
        createResourceDetailUrl={createResourceDetailUrl}
      />
    )}
    {clone.member.itemType === "group" && (
      <ResourceTreeItemGroup
        key={clone.member.id}
        group={clone.member}
        createResourceDetailUrl={createResourceDetailUrl}
        nestedLevel={1}
      />
    )}
  </ResourceTreeItemExpandableLayout>
);

export default ResourceTreeItemClone;
