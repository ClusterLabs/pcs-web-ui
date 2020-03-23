import React from "react";
import {
  DataListItem,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

import { types } from "app/store";

import { ResourceTreeItemDescription } from "./ResourceTreeItemDescription";

export const ResourceTreeItemPrimitive = (
  { primitive, createResourceDetailUrl }: {
    primitive: types.cluster.Primitive,
    createResourceDetailUrl: (id: string) => string,
  },
) => (
  <DataListItem aria-labelledby={`resource-tree-item-${primitive.id}`}>
    <DataListItemRow aria-label={`Resource item ${primitive.id}`}>
      <DataListToggle
        aria-label="Resource toggle"
        id={`resource-tree-toggle-${primitive.id}`}
        aria-hidden="true"
      />
      <ResourceTreeItemDescription
        resourceTreeItem={primitive}
        detailUrl={createResourceDetailUrl(primitive.id)}
        type={primitive.type}
        typeDescription={`${primitive.class}:${primitive.provider}`}
      />
    </DataListItemRow>
  </DataListItem>
);
