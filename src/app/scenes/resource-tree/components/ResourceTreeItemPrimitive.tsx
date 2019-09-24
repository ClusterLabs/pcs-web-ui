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
}) => {
  const label = resource.id;
  return (
    <DataListItem aria-labelledby={label}>
      <DataListItemRow>
        <DataListToggle
          id={`resource-tree-${label}`}
          aria-hidden="true"
        />
        <ResourceTreeItemDescription
          itemId={resource.id}
          detailUrl={createResourceDetailUrl(resource.id)}
          type={resource.type}
          typeDescription={`${resource.class}:${resource.provider}`}
        />
      </DataListItemRow>
    </DataListItem>
  );
};

export default ResourceTreeItemPrimitive;
