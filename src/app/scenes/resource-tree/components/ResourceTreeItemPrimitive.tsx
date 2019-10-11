import React from "react";
import {
  DataListItem,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

import { Primitive } from "app/services/cluster/types";

import ResourceTreeItemDescription from "./ResourceTreeItemDescription";

const ResourceTreeItemPrimitive = ({ primitive, createResourceDetailUrl }: {
  primitive: Primitive,
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
