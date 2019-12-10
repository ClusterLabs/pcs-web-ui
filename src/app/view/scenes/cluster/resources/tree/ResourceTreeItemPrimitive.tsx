import React from "react";
import {
  DataListItem,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

import { types } from "app/store";

import ResourceTreeItemDescription from "./ResourceTreeItemDescription";

const ResourceTreeItemPrimitive = ({ primitive, createResourceDetailUrl }: {
  primitive: types.cluster.Primitive,
  createResourceDetailUrl: (id: string) => string,
}) => (
  <DataListItem aria-labelledby={primitive.id}>
    <DataListItemRow>
      <DataListToggle
        id={`resource-tree-${primitive.id}`}
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

export default ResourceTreeItemPrimitive;
