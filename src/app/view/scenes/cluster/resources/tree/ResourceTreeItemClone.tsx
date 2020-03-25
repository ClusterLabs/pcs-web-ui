import React from "react";

import { types } from "app/store";

import { ResourceTreeItemPrimitive } from "./ResourceTreeItemPrimitive";
import { ResourceTreeItemGroup } from "./ResourceTreeItemGroup";
import { ResourceTreeItemCompound } from "./ResourceTreeItemCompound";


export const ResourceTreeItemClone = ({ clone, createResourceDetailUrl }: {
  clone: types.cluster.Clone,
  createResourceDetailUrl: (id: string) => string,
}) => {
  return (
    <ResourceTreeItemCompound
      resourceId={clone.id}
      nestingDepth={1}
      statusList={[{ label: clone.status, severity: clone.statusSeverity }]}
      detailUrl={createResourceDetailUrl(clone.id)}
      type="Clone"
    >
      {clone.member.itemType === "primitive" && (
        <ResourceTreeItemPrimitive
          primitive={clone.member}
          createResourceDetailUrl={createResourceDetailUrl}
        />
      )}
      {clone.member.itemType === "group" && (
        <ResourceTreeItemGroup
          group={clone.member}
          createResourceDetailUrl={createResourceDetailUrl}
          nestedLevel={1}
        />
      )}
    </ResourceTreeItemCompound>
  );
};
