import React from "react";

import { types } from "app/store";

import { ResourceTreeItemPrimitive } from "./ResourceTreeItemPrimitive";
import { ResourceTreeItemGroup } from "./ResourceTreeItemGroup";
import { ResourceTreeItemCompound } from "./ResourceTreeItemCompound";


export const ResourceTreeItemClone = ({ clone }: {
  clone: types.cluster.Clone,
}) => {
  return (
    <ResourceTreeItemCompound
      resourceId={clone.id}
      nestingDepth={1}
      status={clone.status}
      type="Clone"
    >
      {clone.member.itemType === "primitive" && (
        <ResourceTreeItemPrimitive primitive={clone.member} />
      )}
      {clone.member.itemType === "group" && (
        <ResourceTreeItemGroup group={clone.member} nestedLevel={1} />
      )}
    </ResourceTreeItemCompound>
  );
};
