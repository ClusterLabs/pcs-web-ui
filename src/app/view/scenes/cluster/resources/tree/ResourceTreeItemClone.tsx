import React from "react";

import { types } from "app/store";

import ResourceTreeItemPrimitive from "./ResourceTreeItemPrimitive";
import ResourceTreeItemGroup from "./ResourceTreeItemGroup";
import ResourceTreeItemExpandableLayout
  from "./ResourceTreeItemExpandableLayout";
import ResourceTreeItemDescription from "./ResourceTreeItemDescription";


const ResourceTreeItemClone = ({ clone, createResourceDetailUrl }: {
  clone: types.cluster.Clone,
  createResourceDetailUrl: (id: string) => string,
}) => (
  <ResourceTreeItemExpandableLayout
    resourceTreeItem={clone}
    nestedAriaLabel={`Clone ${clone.id}: member`}
    nestingDepth={1}
    itemDescription={(
      <ResourceTreeItemDescription
        resourceTreeItem={clone}
        detailUrl={createResourceDetailUrl(clone.id)}
        type="Clone"
      />
    )}
  >
    {clone.member.itemType === "primitive" && (
      <ResourceTreeItemPrimitive
        key={clone.member.id}
        primitive={clone.member}
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
