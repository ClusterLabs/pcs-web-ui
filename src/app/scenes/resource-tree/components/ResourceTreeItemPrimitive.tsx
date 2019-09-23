import React from "react";
import { Link } from "react-router-dom";
import {
  DataListItem,
  DataListItemRow,
  DataListToggle,
  DataListItemCells,
  DataListCell,
} from "@patternfly/react-core";

import { Resource } from "app/services/cluster/types";

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
        <DataListItemCells
          dataListCells={[
            <DataListCell key={label}>
              <Link to={createResourceDetailUrl(resource.id)}>
                <strong>{label}</strong>
              </Link>
            </DataListCell>,
            <DataListCell key={`${label}.type`}>
              <span>Type </span>
              <strong>{resource.type}</strong>
              <span>{` (${resource.class}:${resource.provider})`}</span>
            </DataListCell>,
          ]}
        />
      </DataListItemRow>
    </DataListItem>
  );
};

export default ResourceTreeItemPrimitive;
