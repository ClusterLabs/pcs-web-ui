import React from "react";
import { Link } from "react-router-dom";
import {
  DataListItem,
  DataListItemRow,
  DataListToggle,
  DataListItemCells,
  DataListCell,
} from "@patternfly/react-core";

import { ResourceTreeItem } from "app/services/cluster/types";

const ResourceTreeItemPrimitive = ({ resource, createResourceDetailUrl }: {
  resource: ResourceTreeItem,
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
              <strong>Primitive</strong>
            </DataListCell>,
          ]}
        />
      </DataListItemRow>
    </DataListItem>
  );
};

export default ResourceTreeItemPrimitive;
