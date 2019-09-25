import React from "react";
import {
  DataListItem,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

import { Resource } from "app/services/cluster/types";

import ResourceTreeItemDescription from "./ResourceTreeItemDescription";

const ResourceTreeItemPrimitive = ({ resource, createResourceDetailUrl }: {
  resource: Resource,
  createResourceDetailUrl: (id: string) => string,
}) => (
  <DataListItem aria-labelledby={resource.id}>
    <DataListItemRow>
      <DataListToggle
        id={`resource-tree-${resource.id}`}
        aria-hidden="true"
      />
      <ResourceTreeItemDescription
        resourceTreeItem={resource}
        detailUrl={createResourceDetailUrl(resource.id)}
        type={resource.type}
        typeDescription={`${resource.class}:${resource.provider}`}
      />
    </DataListItemRow>
  </DataListItem>
);

export default ResourceTreeItemPrimitive;
