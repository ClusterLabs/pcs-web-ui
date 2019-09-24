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

const ResourceTreeItemGroup = (
  { group, createResourceDetailUrl, nestedLevel = 0 }: {
    group: Group,
    createResourceDetailUrl: (id: string) => string,
    nestedLevel?: number,
  },
) => {
  const [expanded, setExpanded] = React.useState(false);
  const label = group.id;
  return (
    <DataListItem aria-labelledby={label} isExpanded={expanded}>
      <DataListItemRow>
        <DataListToggle
          id={`resource-tree-${label}`}
          isExpanded={expanded}
          onClick={() => setExpanded(!expanded)}
        />
        <DataListItemCells
          dataListCells={[
            <DataListCell key={label}>
              <Link to={createResourceDetailUrl(group.id)}>
                <strong>{label}</strong>
              </Link>
            </DataListCell>,
            <DataListCell key={`${label}.type`}>
              <span>Type </span>
              <strong>Group</strong>
            </DataListCell>,
          ]}
        />
      </DataListItemRow>
      {expanded && (
        <DataListContent
          aria-label={`resources-of-group-${group.id}`}
          noPadding
        >
          <DataList
            aria-label={`Group ${group.id} resource list`}
            data-level={1 + nestedLevel}
          >
            {group.resources.map(resource => (
              <ResourceTreeItemPrimitive
                key={resource.id}
                resource={resource}
                createResourceDetailUrl={createResourceDetailUrl}
              />
            ))}
          </DataList>
        </DataListContent>
      )}
    </DataListItem>
  );
};

export default ResourceTreeItemGroup;
