import React from "react";

import { types } from "app/store";

import { ResourceTreeItem } from "./ResourceTreeItem";

export const ResourceTreeItemPrimitive = ({ primitive }: {
  primitive: types.cluster.Primitive,
}) => (
  <ResourceTreeItem
    resourceId={primitive.id}
    status={primitive.status}
    type={primitive.type}
    typeDescription={`${primitive.class}:${primitive.provider}`}
  />
);
