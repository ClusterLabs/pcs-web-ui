import React from "react";
import { Link } from "react-router-dom";
import {
  DataList,
  DataListItem,
  DataListItemRow,
  DataListToggle,
  DataListItemCells,
  DataListCell,
  DataListContent,
} from "@patternfly/react-core";

import { Group } from "app/services/cluster/types";

import ResourceTreeItemPrimitive from "./ResourceTreeItemPrimitive";

const ResourceTreeItemGroup = ({ group, createResourceDetailUrl }: {
  group: Group,
  createResourceDetailUrl: (id: string) => string,
}) => {
  const label = group.id;
  return (
    <DataListItem aria-labelledby={label} isExpanded>
      <DataListItemRow>
        <DataListToggle id={`resource-tree-${label}`} />
        <DataListItemCells
          dataListCells={[
            <DataListCell key={label}>
              <Link to={createResourceDetailUrl(group.id)}>
                <strong>{label}</strong>
              </Link>
            </DataListCell>,
            <DataListCell key={`${label}.type`}>
              <span>Type </span>
              <strong>Clone</strong>
            </DataListCell>,
          ]}
        />
      </DataListItemRow>
      <DataListContent aria-label={`resources-of-group-${group.id}`}>
        <DataList aria-label={`Group ${group.id} resource list`}>
          {group.resources.map(resource => (
            <ResourceTreeItemPrimitive
              key={resource.id}
              resource={resource}
              createResourceDetailUrl={createResourceDetailUrl}
            />
          ))}
        </DataList>
      </DataListContent>
    </DataListItem>
  );
};

export default ResourceTreeItemGroup;
