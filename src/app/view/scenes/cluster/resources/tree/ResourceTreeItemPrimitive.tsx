import React from "react";

import { types } from "app/store";

import { ResourceTreeItem } from "./ResourceTreeItem";

export const ResourceTreeItemPrimitive = (
  { primitive, createResourceDetailUrl }: {
    primitive: types.cluster.Primitive,
    createResourceDetailUrl: (id: string) => string,
  },
) => (
  <ResourceTreeItem
    resourceId={primitive.id}
    statusList={primitive.statusInfoList}
    detailUrl={createResourceDetailUrl(primitive.id)}
    type={primitive.type}
    typeDescription={`${primitive.class}:${primitive.provider}`}
  />
);
